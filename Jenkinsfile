pipeline {
    agent any

    environment {
        IMAGE_NAME = 'my-node-app'
        DOCKERFILE = 'Dockerfile'
        CONTAINER_NAME = 'my-node-app'
        PORT_MAPPING = '4001:4001'  // Map container port 4000 to host port 8080
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
                    // Stop and remove any existing container with the same name
                    // sh "docker stop ${CONTAINER_NAME} || true"
                    // sh "docker rm ${CONTAINER_NAME} || true"
                    sh "docker build -t ${IMAGE_NAME} ."
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    // Run a new container with the built image
                    sh "docker run -d --name ${CONTAINER_NAME} -p ${PORT_MAPPING} ${IMAGE_NAME}"
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
