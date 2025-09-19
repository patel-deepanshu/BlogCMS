pipeline {
    agent any

    tools {
        nodejs "NodeJS20" // name you set in Jenkins
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'master', url: 'https://github.com/patel-deepanshu/BlogCMS.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Deploy') {
            steps {
                sh 'pm2 restart blogcms || pm2 start npm --name "blogcms" -- run start'
            }
        }
    }
}
