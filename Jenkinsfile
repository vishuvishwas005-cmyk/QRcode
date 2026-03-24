pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }
        stage('Test Locally') {
            steps {
                sh 'npm test'
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    def imageTag = "qr-app-${env.BUILD_ID}"
                    sh "docker build -t \${imageTag} ."
                }
            }
        }

        stage('Run Container') {
            steps {
                script {
                    def imageTag = "qr-app-${env.BUILD_ID}"
                    def containerName = "qr-container-${env.BUILD_ID}"
                    sh """
                        docker stop \${containerName} || true
                        docker rm \${containerName} || true
                        docker run -d -p ${env.JENKINS_NODE_COOKIE ? 3000 + env.JENKINS_NODE_COOKIE.hashCode() % 100 : 3000}:5000 --name \${containerName} ${imageTag}
                    """
                }
            }
        }
        stage('Health Check & Test') {
            steps {
                script {
                    sleep 10
                    def containerName = "qr-container-${env.BUILD_ID}"
                    sh """
                        curl -f http://localhost:${env.JENKINS_NODE_COOKIE ? 3000 + env.JENKINS_NODE_COOKIE.hashCode() % 100 : 3000}/generate \\
                        -H 'Content-Type: application/json' \\
                        -d '{\"text\":\"test\"}' || exit 1
                    """
                    sh """
                        docker exec \${containerName} npm test || exit 1
                    """
                }
            }
        }
    }

    post {
        always {
            script {
                def containerName = "qr-container-${env.BUILD_ID}"
                def imageTag = "qr-app-${env.BUILD_ID}"
                sh """
                    docker stop \${containerName} || true
                    docker rm \${containerName} || true
                    docker rmi \${imageTag} || true
                """
            }
            cleanWs()
        }
    }
}
