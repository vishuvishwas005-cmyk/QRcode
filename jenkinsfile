pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh 'docker build -t qr-app .'
                }
            }
        }

        stage('Run Container') {
            steps {
                script {
                    sh 'docker stop qr-container || true'
                    sh 'docker rm qr-container || true'
                    sh 'docker run -d -p 3000:5000 --name qr-container qr-app'
                }
            }
        }
    }

    post {
        always {
            script {
                sh 'docker stop qr-container || true'
                sh 'docker rm qr-container || true'
                sh 'docker rmi qr-app || true'
            }
            cleanWs()
        }
    }
}
