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
                // Install dependencies for both client and server
                dir('client') {
                    sh 'npm install'
                }
                dir('server') {
                    sh 'npm install'
                }
            }
        }

        stage('Build') {
    steps {
        // Build client application
        dir('client') {
            sh 'npm run build'
        }
        // Build server application 
        dir('server') {
            sh 'npm run build'
        }
    }
}
        stage('Deploy') {
            steps {
                dir('server') {
                    // Stop any existing process and start server with PM2
                    sh 'pm2 stop server || true'
                    sh 'pm2 delete server || true' 
                    sh 'pm2 start npm --name "server" -- start'
                }
                dir('client') {
                    // Deploy client build files to web server directory
                    sh 'sudo cp -r build/* /var/www/html/'
                }
            }
        }
    }
}
