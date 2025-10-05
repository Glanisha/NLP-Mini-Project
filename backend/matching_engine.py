"""
Resume-Job Description Matching Module
Includes text preprocessing, skill extraction, and similarity scoring
"""

import re
import string
from typing import Dict, List, Set, Tuple
from collections import defaultdict
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import PorterStemmer

from tech_mappings import TECH_MAPPINGS, SKILL_TO_CATEGORY

# Download required NLTK data
try:
    nltk.data.find('tokenizers/punkt')
except LookupError:
    nltk.download('punkt')

try:
    nltk.data.find('corpora/stopwords')
except LookupError:
    nltk.download('stopwords')

class ResumeJobMatcher:
    def __init__(self):
        self.stemmer = PorterStemmer()
        self.stop_words = set(stopwords.words('english'))
        self.vectorizer = TfidfVectorizer(
            stop_words='english',
            lowercase=True,
            ngram_range=(1, 3),  # Include unigrams, bigrams, and trigrams
            max_features=5000,
            min_df=1,
            token_pattern=r'\b[A-Za-z][A-Za-z0-9]*[A-Za-z0-9]*\b'  # Better pattern for tech terms
        )
    
    def preprocess_text(self, text: str) -> str:
        """
        Clean and preprocess text for analysis
        """
        # Convert to lowercase
        text = text.lower()
        
        # Remove extra whitespace and newlines
        text = re.sub(r'\s+', ' ', text)
        
        # Remove special characters but keep alphanumeric and common punctuation
        text = re.sub(r'[^\w\s\-\+\#\.]', ' ', text)
        
        # Handle common variations
        text = re.sub(r'\bc\+\+\b', 'cpp', text)
        text = re.sub(r'\bc#\b', 'csharp', text)
        text = re.sub(r'\bf#\b', 'fsharp', text)
        text = re.sub(r'\bnode\.js\b', 'nodejs', text)
        text = re.sub(r'\breact\.js\b', 'reactjs', text)
        text = re.sub(r'\bvue\.js\b', 'vuejs', text)
        
        return text.strip()
    
    def extract_skills_from_text(self, text: str) -> Dict[str, Set[str]]:
        """
        Extract technical skills from text using the technology mappings
        """
        preprocessed_text = self.preprocess_text(text)
        found_skills = defaultdict(set)
        
        # Create a set of all possible skills for faster lookup
        all_skills = set()
        for skills_list in TECH_MAPPINGS.values():
            all_skills.update(skill.lower() for skill in skills_list)
        
        # Tokenize text into words and phrases
        words = word_tokenize(preprocessed_text)
        
        # Check individual words
        for word in words:
            if word in all_skills:
                categories = SKILL_TO_CATEGORY.get(word, [])
                for category in categories:
                    found_skills[category].add(word)
        
        # Check bigrams and trigrams
        for i in range(len(words)):
            # Bigrams
            if i < len(words) - 1:
                bigram = ' '.join(words[i:i+2])
                if bigram in all_skills:
                    categories = SKILL_TO_CATEGORY.get(bigram, [])
                    for category in categories:
                        found_skills[category].add(bigram)
            
            # Trigrams
            if i < len(words) - 2:
                trigram = ' '.join(words[i:i+3])
                if trigram in all_skills:
                    categories = SKILL_TO_CATEGORY.get(trigram, [])
                    for category in categories:
                        found_skills[category].add(trigram)
        
        # Convert defaultdict to regular dict
        return {category: skills for category, skills in found_skills.items()}
    
    def calculate_skill_match_score(self, resume_skills: Dict[str, Set[str]], 
                                   jd_skills: Dict[str, Set[str]]) -> Dict[str, float]:
        """
        Calculate skill matching scores by category
        """
        skill_scores = {}
        
        # Get all categories from both resume and job description
        all_categories = set(resume_skills.keys()) | set(jd_skills.keys())
        
        for category in all_categories:
            resume_category_skills = resume_skills.get(category, set())
            jd_category_skills = jd_skills.get(category, set())
            
            if not jd_category_skills:
                # If job description doesn't require this category, score is neutral
                skill_scores[category] = 0.0
                continue
            
            # Calculate intersection and match percentage
            matched_skills = resume_category_skills & jd_category_skills
            match_percentage = len(matched_skills) / len(jd_category_skills) if jd_category_skills else 0.0
            
            skill_scores[category] = match_percentage
        
        return skill_scores
    
    def calculate_text_similarity(self, resume_text: str, jd_text: str) -> float:
        """
        Calculate overall text similarity using TF-IDF and cosine similarity
        """
        try:
            # Preprocess texts
            processed_resume = self.preprocess_text(resume_text)
            processed_jd = self.preprocess_text(jd_text)
            
            # Create TF-IDF vectors
            corpus = [processed_resume, processed_jd]
            tfidf_matrix = self.vectorizer.fit_transform(corpus)
            
            # Calculate cosine similarity
            similarity_matrix = cosine_similarity(tfidf_matrix)
            
            # Return similarity between resume and job description
            return similarity_matrix[0, 1]
        
        except Exception as e:
            print(f"Error calculating text similarity: {e}")
            return 0.0
    
    def calculate_overall_match_score(self, resume_text: str, jd_text: str) -> Dict:
        """
        Calculate comprehensive matching score between resume and job description
        """
        # Extract skills from both texts
        resume_skills = self.extract_skills_from_text(resume_text)
        jd_skills = self.extract_skills_from_text(jd_text)
        
        # Calculate skill matching scores
        skill_scores = self.calculate_skill_match_score(resume_skills, jd_skills)
        
        # Calculate overall text similarity
        text_similarity = self.calculate_text_similarity(resume_text, jd_text)
        
        # Calculate weighted overall score
        # Weight skill matching more heavily than general text similarity
        skill_weight = 0.7
        text_weight = 0.3
        
        # Calculate average skill score (only for categories required by JD)
        jd_categories = set(jd_skills.keys())
        if jd_categories:
            relevant_skill_scores = [skill_scores[cat] for cat in jd_categories if cat in skill_scores]
            avg_skill_score = np.mean(relevant_skill_scores) if relevant_skill_scores else 0.0
        else:
            avg_skill_score = 0.0
        
        overall_score = (skill_weight * avg_skill_score) + (text_weight * text_similarity)
        
        # Convert score to percentage
        overall_percentage = min(100.0, overall_score * 100)
        
        return {
            'overall_match_percentage': round(overall_percentage, 2),
            'text_similarity_score': round(text_similarity * 100, 2),
            'skill_match_scores': {cat: round(score * 100, 2) for cat, score in skill_scores.items()},
            'resume_skills': {cat: list(skills) for cat, skills in resume_skills.items()},
            'job_description_skills': {cat: list(skills) for cat, skills in jd_skills.items()},
            'matched_skills': self._get_matched_skills(resume_skills, jd_skills),
            'missing_skills': self._get_missing_skills(resume_skills, jd_skills)
        }
    
    def _get_matched_skills(self, resume_skills: Dict[str, Set[str]], 
                          jd_skills: Dict[str, Set[str]]) -> Dict[str, List[str]]:
        """
        Get skills that match between resume and job description
        """
        matched = {}
        for category in jd_skills.keys():
            if category in resume_skills:
                matched_in_category = list(resume_skills[category] & jd_skills[category])
                if matched_in_category:
                    matched[category] = matched_in_category
        return matched
    
    def _get_missing_skills(self, resume_skills: Dict[str, Set[str]], 
                          jd_skills: Dict[str, Set[str]]) -> Dict[str, List[str]]:
        """
        Get skills required by job description but missing from resume
        """
        missing = {}
        for category, jd_category_skills in jd_skills.items():
            resume_category_skills = resume_skills.get(category, set())
            missing_in_category = list(jd_category_skills - resume_category_skills)
            if missing_in_category:
                missing[category] = missing_in_category
        return missing

# Create global matcher instance
matcher = ResumeJobMatcher()

def get_resume_job_match_score(resume_text: str, jd_text: str) -> Dict:
    """
    Main function to get matching score between resume and job description
    """
    return matcher.calculate_overall_match_score(resume_text, jd_text)