pipeline {
    agent any 
    
    environment {
        IMAGE_NAME = "uthpala99/nextjs-ibills-img:${BUILD_NUMBER}"
    }

    stages { 
        stage('Checkout') {
            steps {
                retry(3) {
                    git branch: 'main', url: 'https://github.com/uthpala99131/IBILLS-Auto-Lanka'
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Build Next.js App') {
            steps {
                bat 'npm run build'
            }
        }

        stage('Build Docker Image') {
            steps {
                bat "docker build -t ${IMAGE_NAME} ."
            }
        }

        stage('Login to Docker Hub') {
            steps {
                withCredentials([string(credentialsId: 'ibills-pass', variable: 'ibills_pass')]) {
                    bat "docker login -u uthpala99 -p %ibills_pass%"
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                bat "docker push ${IMAGE_NAME}"
            }
        }
    }

    post {
        always {
            bat 'docker logout'
        }
    }
}
