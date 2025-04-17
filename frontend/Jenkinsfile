pipeline {
    agent any 
    
    stages { 
        stage('SCM Checkout') {
            steps {
                retry(3) {
                    git branch: 'main', url: 'https://github.com/uthpala99131/IBILLS-Auto-Lanka.git'
                }
            }
        }
        stage('Build Docker Image') {
            steps {  
                bat 'docker build -t uthpala99/ibills-img:%BUILD_NUMBER% .'
            }
        }
        stage('Login to Docker Hub') {
            steps {
               withCredentials([string(credentialsId: 'test-dockerhubpassword', variable: 'test-dockerhubpass')]){
                    script {
                        bat "docker login -u uthpala99 -p %test-dockerhubpass%"
                    }
                }
            }
        }
        stage('Push Image') {
            steps {
                bat 'docker push uthpala99/ibills-img:%BUILD_NUMBER%'
            }
        }
    }
    post {
        always {
            bat 'docker logout'
        }
    }
}