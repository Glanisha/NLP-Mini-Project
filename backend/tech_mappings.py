"""
Technology Skills Mapping Dictionary
Comprehensive mapping of technologies and their related skills/frameworks
"""

TECH_MAPPINGS = {
    # Programming Languages - Python Ecosystem
    'python': ['python', 'python3', 'py', 'django', 'flask', 'fastapi', 'pyramid', 'bottle', 
               'tornado', 'cherrypy', 'web2py', 'pandas', 'numpy', 'scipy', 'matplotlib',
               'seaborn', 'plotly', 'jupyter', 'ipython', 'anaconda', 'conda', 'pip',
               'virtualenv', 'poetry', 'pipenv', 'pytest', 'unittest', 'nose', 'tox'],
    
    # JavaScript Ecosystem
    'javascript': ['javascript', 'js', 'ecmascript', 'es6', 'es7', 'es8', 'es2015', 'es2016',
                   'es2017', 'es2018', 'es2019', 'es2020', 'es2021', 'typescript', 'ts',
                   'coffeescript', 'node', 'nodejs', 'node.js', 'deno', 'bun'],
    
    # Frontend Frameworks & Libraries
    'react': ['react', 'reactjs', 'react.js', 'react native', 'react-native', 'nextjs', 
              'next.js', 'gatsby', 'remix', 'preact', 'redux', 'redux-saga', 'redux-thunk',
              'mobx', 'recoil', 'zustand', 'jotai', 'react-query', 'swr', 'react router',
              'react-router', 'react-router-dom', 'jsx', 'tsx', 'hooks', 'context api'],
    
    'angular': ['angular', 'angularjs', 'angular.js', 'angular2', 'angular4', 'angular8',
                'angular9', 'angular10', 'angular11', 'angular12', 'angular13', 'angular14',
                'angular15', 'angular16', 'rxjs', 'ngrx', 'angular material', 'angular cli'],
    
    'vue': ['vue', 'vuejs', 'vue.js', 'vue2', 'vue3', 'nuxt', 'nuxtjs', 'nuxt.js',
            'vuex', 'pinia', 'vue router', 'vue-router', 'composition api', 'vite'],
    
    'frontend_frameworks': ['svelte', 'sveltekit', 'solid', 'solidjs', 'qwik', 'alpine.js',
                           'alpinejs', 'lit', 'stencil', 'ember', 'emberjs', 'backbone',
                           'backbonejs', 'knockout', 'knockoutjs', 'polymer', 'marko',
                           'mithril', 'inferno', 'hyperapp', 'choo', 'riot', 'riotjs'],
    
    # Frontend UI/CSS
    'html_css': ['html', 'html5', 'css', 'css3', 'sass', 'scss', 'less', 'stylus',
                 'postcss', 'tailwind', 'tailwindcss', 'bootstrap', 'bootstrap3',
                 'bootstrap4', 'bootstrap5', 'bulma', 'foundation', 'materialize',
                 'material-ui', 'mui', 'chakra', 'chakra-ui', 'ant design', 'antd',
                 'semantic ui', 'semantic-ui', 'styled-components', 'emotion',
                 'css modules', 'bem', 'responsive design', 'flexbox', 'grid',
                 'css grid', 'animations', 'transitions'],
    
    # Backend - Node.js
    'nodejs_backend': ['express', 'expressjs', 'express.js', 'koa', 'koajs', 'hapi',
                       'hapijs', 'fastify', 'nestjs', 'nest.js', 'sails', 'sailsjs',
                       'adonisjs', 'adonis', 'meteor', 'meteorjs', 'loopback',
                       'restify', 'feathers', 'feathersjs', 'socket.io', 'socketio',
                       'graphql', 'apollo', 'apollo-server', 'prisma', 'typeorm',
                       'sequelize', 'mongoose', 'bookshelf', 'knex', 'objection'],
    
    # Java Ecosystem
    'java': ['java', 'java8', 'java11', 'java17', 'java21', 'jdk', 'jre', 'jvm',
             'spring', 'spring boot', 'springboot', 'spring mvc', 'spring security',
             'spring cloud', 'spring data', 'hibernate', 'jpa', 'ejb', 'jsf', 'jsf',
             'servlet', 'jsp', 'jstl', 'struts', 'struts2', 'play', 'play framework',
             'grails', 'micronaut', 'quarkus', 'vertx', 'vert.x', 'dropwizard',
             'maven', 'gradle', 'ant', 'junit', 'testng', 'mockito', 'j2ee', 'jakarta ee'],
    
    # .NET Ecosystem
    'dotnet': ['c#', 'csharp', 'c sharp', '.net', 'dotnet', '.net core', 'dotnet core',
               '.net framework', 'asp.net', 'asp.net core', 'asp.net mvc', 'blazor',
               'razor', 'entity framework', 'ef core', 'wcf', 'wpf', 'winforms',
               'xamarin', 'maui', 'linq', 'nuget', 'visual studio', 'vb.net', 'f#',
               'nancy', 'signalr', 'dapper', 'nhibernate'],
    
    # PHP Ecosystem
    'php': ['php', 'php7', 'php8', 'laravel', 'symfony', 'codeigniter', 'yii',
            'yii2', 'cakephp', 'zend', 'zend framework', 'slim', 'lumen',
            'phalcon', 'fuelphp', 'wordpress', 'drupal', 'joomla', 'magento',
            'prestashop', 'opencart', 'composer', 'phpunit', 'eloquent', 'doctrine'],
    
    # Ruby Ecosystem
    'ruby': ['ruby', 'ruby on rails', 'rails', 'ror', 'sinatra', 'padrino',
             'hanami', 'grape', 'roda', 'cuba', 'rspec', 'minitest', 'capybara',
             'bundler', 'rake', 'activerecord', 'sequel', 'jekyll', 'middleman'],
    
    # Go Ecosystem
    'go': ['go', 'golang', 'gin', 'echo', 'fiber', 'beego', 'revel', 'buffalo',
           'chi', 'gorilla', 'mux', 'gorm', 'sqlx', 'testify'],
    
    # Rust Ecosystem
    'rust': ['rust', 'actix', 'actix-web', 'rocket', 'warp', 'axum', 'tide',
             'tokio', 'async-std', 'diesel', 'sqlx', 'cargo'],
    
    # Other Languages
    'cpp': ['c++', 'cpp', 'c', 'boost', 'qt', 'cmake', 'make', 'gcc', 'clang'],
    'scala': ['scala', 'akka', 'play framework', 'scalatra', 'finagle', 'cats', 'zio'],
    'kotlin': ['kotlin', 'ktor', 'spring boot', 'exposed', 'android'],
    'swift': ['swift', 'swiftui', 'uikit', 'vapor', 'kitura', 'perfect', 'cocoapods'],
    'r': ['r', 'rstudio', 'shiny', 'ggplot2', 'dplyr', 'tidyverse', 'caret'],
    'perl': ['perl', 'perl5', 'catalyst', 'dancer', 'mojolicious', 'cpan'],
    'elixir': ['elixir', 'phoenix', 'ecto', 'plug', 'nerves', 'mix', 'hex'],
    'clojure': ['clojure', 'clojurescript', 'leiningen', 'ring', 'compojure', 'reagent'],
    'haskell': ['haskell', 'yesod', 'snap', 'servant', 'cabal', 'stack'],
    
    # Databases - SQL
    'sql_databases': ['sql', 'mysql', 'mariadb', 'postgresql', 'postgres', 'sqlite',
                      'oracle', 'oracle db', 'mssql', 'sql server', 'microsoft sql server',
                      'db2', 'sybase', 'cockroachdb', 'cockroach', 'timescaledb',
                      'stored procedures', 'triggers', 'views', 'indexing', 'query optimization'],
    
    # Databases - NoSQL
    'nosql_databases': ['nosql', 'mongodb', 'mongo', 'mongoose', 'couchdb', 'couch',
                        'cassandra', 'hbase', 'dynamodb', 'rethinkdb', 'arangodb',
                        'orientdb', 'neo4j', 'graph database', 'document database'],
    
    # Databases - In-Memory & Cache
    'cache_databases': ['redis', 'memcached', 'memcache', 'hazelcast', 'ignite',
                        'aerospike', 'couchbase', 'elasticsearch', 'elastic',
                        'opensearch', 'solr', 'apache solr', 'meili', 'meilisearch'],
    
    # Message Queues & Streaming
    'messaging': ['kafka', 'apache kafka', 'rabbitmq', 'activemq', 'zeromq',
                  'nats', 'pulsar', 'apache pulsar', 'amazon sqs', 'sqs',
                  'amazon sns', 'sns', 'google pubsub', 'pub/sub', 'redis pub/sub',
                  'celery', 'sidekiq', 'bull', 'bee-queue', 'kue'],
    
    # Cloud Platforms - AWS
    'aws': ['aws', 'amazon web services', 'ec2', 'elastic compute cloud', 's3',
            'lambda', 'aws lambda', 'rds', 'dynamodb', 'elasticache', 'cloudfront',
            'cloudformation', 'elastic beanstalk', 'ecs', 'eks', 'fargate',
            'api gateway', 'route53', 'vpc', 'iam', 'cognito', 'amplify',
            'sagemaker', 'emr', 'glue', 'athena', 'redshift', 'kinesis',
            'sns', 'sqs', 'step functions', 'cloudwatch', 'cloudtrail',
            'elastic load balancing', 'elb', 'alb', 'nlb', 'auto scaling'],
    
    # Cloud Platforms - Azure
    'azure': ['azure', 'microsoft azure', 'azure devops', 'azure functions',
              'azure app service', 'azure sql', 'cosmos db', 'azure storage',
              'azure kubernetes service', 'aks', 'azure vm', 'azure ad',
              'azure active directory', 'blob storage', 'azure cache', 'azure cdn',
              'azure service bus', 'event hubs', 'logic apps', 'power apps'],
    
    # Cloud Platforms - GCP
    'gcp': ['gcp', 'google cloud', 'google cloud platform', 'compute engine',
            'app engine', 'cloud functions', 'cloud run', 'gke', 'kubernetes engine',
            'cloud storage', 'cloud sql', 'firestore', 'bigtable', 'spanner',
            'pub/sub', 'dataflow', 'dataproc', 'bigquery', 'cloud cdn',
            'cloud load balancing', 'firebase', 'firebase auth', 'firebase hosting'],
    
    # Other Cloud
    'other_cloud': ['ibm cloud', 'oracle cloud', 'digitalocean', 'linode', 'vultr',
                    'heroku', 'netlify', 'vercel', 'cloudflare', 'cloudflare workers',
                    'railway', 'render', 'fly.io', 'supabase', 'planetscale'],
    
    # DevOps & CI/CD
    'cicd': ['jenkins', 'gitlab ci', 'gitlab', 'github actions', 'circleci',
             'travis ci', 'travis', 'teamcity', 'bamboo', 'azure pipelines',
             'codepipeline', 'codebuild', 'codedeploy', 'argocd', 'argo cd',
             'flux', 'spinnaker', 'harness', 'drone', 'buildkite', 'semaphore'],
    
    # Containers & Orchestration
    'containers': ['docker', 'docker compose', 'docker-compose', 'podman',
                   'containerd', 'cri-o', 'kubernetes', 'k8s', 'kubectl',
                   'helm', 'kustomize', 'minikube', 'kind', 'k3s', 'microk8s',
                   'openshift', 'rancher', 'nomad', 'docker swarm'],
    
    # Infrastructure as Code
    'iac': ['terraform', 'terragrunt', 'pulumi', 'cloudformation', 'arm templates',
            'bicep', 'ansible', 'puppet', 'chef', 'saltstack', 'vagrant',
            'packer', 'crossplane', 'cdk', 'aws cdk', 'cdktf'],
    
    # Monitoring & Logging
    'monitoring': ['prometheus', 'grafana', 'datadog', 'new relic', 'dynatrace',
                   'splunk', 'elk', 'elk stack', 'elasticsearch', 'logstash', 'kibana',
                   'fluentd', 'fluent bit', 'loki', 'jaeger', 'zipkin', 'opentelemetry',
                   'sentry', 'raygun', 'appinsights', 'cloudwatch', 'stackdriver',
                   'pagerduty', 'opsgenie', 'nagios', 'zabbix', 'icinga'],
    
    # Testing
    'testing': ['jest', 'mocha', 'chai', 'jasmine', 'karma', 'cypress', 'playwright',
                'selenium', 'webdriver', 'puppeteer', 'testcafe', 'nightwatch',
                'protractor', 'enzyme', 'react testing library', 'vue test utils',
                'junit', 'testng', 'pytest', 'unittest', 'rspec', 'minitest',
                'phpunit', 'nunit', 'xunit', 'mstest', 'cucumber', 'behave',
                'specflow', 'jmeter', 'gatling', 'locust', 'k6', 'postman'],
    
    # Mobile Development
    'android': ['android', 'android studio', 'kotlin', 'java', 'jetpack compose',
                'xml layouts', 'gradle', 'retrofit', 'room', 'dagger', 'hilt',
                'rxjava', 'coroutines', 'flow', 'mvvm', 'mvp', 'mvi'],
    
    'ios': ['ios', 'swift', 'swiftui', 'uikit', 'objective-c', 'objective c',
            'xcode', 'cocoapods', 'carthage', 'swift package manager', 'spm',
            'combine', 'rxswift', 'alamofire', 'core data', 'realm'],
    
    'cross_platform_mobile': ['react native', 'flutter', 'dart', 'ionic', 'cordova',
                              'phonegap', 'xamarin', 'nativescript', 'capacitor',
                              'expo', 'react-native', 'kotlin multiplatform', 'kmp'],
    
    # Data Science & ML
    'machine_learning': ['machine learning', 'ml', 'deep learning', 'neural networks',
                         'artificial intelligence', 'ai', 'natural language processing',
                         'nlp', 'computer vision', 'cv', 'tensorflow', 'keras',
                         'pytorch', 'scikit-learn', 'sklearn', 'xgboost', 'lightgbm',
                         'catboost', 'fastai', 'hugging face', 'transformers',
                         'bert', 'gpt', 'llm', 'large language model', 'opencv',
                         'yolo', 'cnn', 'rnn', 'lstm', 'gan', 'reinforcement learning'],
    
    'data_science': ['data science', 'data analysis', 'data analytics', 'statistics',
                     'pandas', 'numpy', 'scipy', 'matplotlib', 'seaborn', 'plotly',
                     'bokeh', 'altair', 'jupyter', 'notebook', 'jupyterlab',
                     'spyder', 'rstudio', 'tableau', 'power bi', 'powerbi',
                     'looker', 'qlik', 'dax', 'data visualization', 'etl'],
    
    'big_data': ['hadoop', 'hdfs', 'mapreduce', 'spark', 'apache spark', 'pyspark',
                 'hive', 'pig', 'hbase', 'impala', 'presto', 'flink', 'storm',
                 'kafka', 'airflow', 'apache airflow', 'luigi', 'prefect',
                 'dagster', 'dbt', 'databricks', 'snowflake', 'redshift'],
    
    # API & Integration
    'api': ['rest', 'restful', 'rest api', 'graphql', 'grpc', 'soap', 'xml-rpc',
            'json-rpc', 'websocket', 'websockets', 'sse', 'server-sent events',
            'api gateway', 'swagger', 'openapi', 'postman', 'insomnia',
            'apollo', 'hasura', 'prisma', 'strapi', 'directus'],
    
    # Security
    'security': ['oauth', 'oauth2', 'jwt', 'json web token', 'saml', 'openid',
                 'authentication', 'authorization', 'encryption', 'ssl', 'tls',
                 'https', 'penetration testing', 'owasp', 'cors', 'csrf',
                 'xss', 'sql injection', 'security', 'cybersecurity', 'infosec',
                 'keycloak', 'auth0', 'okta', 'aws cognito', 'firebase auth'],
    
    # Version Control
    'version_control': ['git', 'github', 'gitlab', 'bitbucket', 'svn', 'subversion',
                        'mercurial', 'perforce', 'git flow', 'github flow',
                        'pull request', 'merge request', 'code review'],
    
    # Web Servers & Reverse Proxy
    'web_servers': ['nginx', 'apache', 'apache http server', 'iis', 'tomcat',
                    'jetty', 'wildfly', 'jboss', 'weblogic', 'websphere',
                    'caddy', 'traefik', 'envoy', 'haproxy', 'lighttpd'],
    
    # Build Tools
    'build_tools': ['webpack', 'vite', 'rollup', 'parcel', 'esbuild', 'swc',
                    'babel', 'gulp', 'grunt', 'npm', 'yarn', 'pnpm', 'turbo',
                    'lerna', 'nx', 'rush', 'maven', 'gradle', 'ant', 'make'],
    
    # Methodologies
    'agile': ['agile', 'scrum', 'kanban', 'lean', 'devops', 'devsecops',
              'waterfall', 'sprint', 'jira', 'confluence', 'trello',
              'asana', 'monday', 'azure boards', 'rally'],
    
    # Soft Skills & Practices
    'practices': ['code review', 'pair programming', 'tdd', 'test driven development',
                  'bdd', 'behavior driven development', 'ddd', 'domain driven design',
                  'microservices', 'monolith', 'serverless', 'design patterns',
                  'solid', 'clean code', 'refactoring', 'documentation',
                  'technical writing', 'debugging', 'troubleshooting'],
    
    # Blockchain & Web3
    'blockchain': ['blockchain', 'web3', 'ethereum', 'solidity', 'smart contracts',
                   'bitcoin', 'cryptocurrency', 'crypto', 'nft', 'defi',
                   'polygon', 'solana', 'cardano', 'polkadot', 'binance smart chain',
                   'hardhat', 'truffle', 'ganache', 'metamask', 'web3.js', 'ethers.js'],
    
    # Game Development
    'game_dev': ['unity', 'unreal', 'unreal engine', 'godot', 'game development',
                 'gamedev', 'c#', 'c++', 'opengl', 'directx', 'vulkan', 'webgl',
                 'three.js', 'threejs', 'babylonjs', 'babylon.js', 'phaser',
                 'pixi.js', 'pixijs', 'cocos2d', 'pygame'],
    
    # CMS & E-commerce
    'cms': ['wordpress', 'drupal', 'joomla', 'contentful', 'sanity', 'strapi',
            'ghost', 'keystone', 'craft cms', 'umbraco', 'sitecore',
            'shopify', 'magento', 'woocommerce', 'prestashop', 'opencart',
            'bigcommerce', 'salesforce commerce cloud'],
}

# Create reverse mapping for efficient lookup
SKILL_TO_CATEGORY = {}
for category, skills in TECH_MAPPINGS.items():
    for skill in skills:
        if skill not in SKILL_TO_CATEGORY:
            SKILL_TO_CATEGORY[skill] = []
        SKILL_TO_CATEGORY[skill].append(category)