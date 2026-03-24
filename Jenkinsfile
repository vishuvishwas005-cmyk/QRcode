pipeline {
    agent any

    stages {

        stage('Clone Code') {
            steps {
                // Specify the branch explicitly
                git branch: 'main', url: 'https://github.com/Varunmj12345/QR.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("qr-app")
                }
            }
        }

        stage('Run Container') {
            steps {
                script {
                    // Use bat instead of sh on Windows
                    bat 'docker rm -f qr-container || echo Container does not exist'
                    bat 'docker run -d -p 3000:3000 --name qr-container qr-app'
                }
            }
        }

    }
}