pipeline {
    agent any

    environment {
        IMAGE_NAME = 'my-node-app'
        DOCKERFILE = 'Dockerfile'
        CONTAINER_NAME = 'my-node-app'
        PORT_MAPPING = '4001:4001'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build . -t blockstack"
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    sh "docker run -d --name blockstack -p 4001:4001 blockstack"
                }
            }
        }
    }

    post {
        success {
            echo "Pipeline succeeded. Your application is deployed."
        }
        failure {
            echo "Pipeline failed. Check the logs for details."
        }
    }
}
