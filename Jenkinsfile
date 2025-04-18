pipeline {
    agent any 
    
    stages { 
        stage('SCM Checkout') {
            steps {
                retry(3) {
                    git branch: 'main', url: 'https://github.com/uthpala99131/IBILLS-Auto-Lanka'
                }
            }
        }
        stage('Build Docker Image') {
            steps {  
                bat 'docker build -t uthpala99/frontend-img:%BUILD_NUMBER% .'
            }
        }
        stage('Login to Docker Hub') {
            steps {
              withCredentials([string(credentialsId: 'testing-dockPass', variable: 'DockerPassword')]) {
                    script {
                        bat "docker login -u uthpala99 -p %DockerPassword%"
                    }
                }
            }
        }
        stage('Push Image') {
            steps {
                bat 'docker push uthpala99/frontend-img:%BUILD_NUMBER%'
            }
        }
    }
    post {
        always {
            bat 'docker logout'
        }
    }
}