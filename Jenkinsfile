pipeline {
    agent any
    
    environment {
        // Define environment variables as needed
        IMAGE_NAME = 'my-app'
        DOCKERFILE = 'Dockerfile'
        CONTAINER_NAME = 'my-app-container'
        PORT_MAPPING = '4001:4001'  // Map container port 80 to host port 8080
    }
    
    stages {
        stage('Checkout') {
            steps {
                // Checkout your source code from your version control system (e.g., Git)
                checkout scm
            }
        }
        
        stage('Build Docker Image') {
            steps {
                // Build your Docker image
                script {
                    docker.build(IMAGE_NAME, "-f ${DOCKERFILE} .")
                }
            }
        }
        
        stage('Test') {
            steps {
                // Run your tests here (e.g., unit tests, integration tests)
            }
        }
        
        stage('Deploy') {
            steps {
                // Deploy your application (e.g., to a staging or production environment)
                script {
                    // Stop and remove any existing container with the same name
                    sh "docker stop ${CONTAINER_NAME} || true"
                    sh "docker rm ${CONTAINER_NAME} || true"
                    
                    // Run a new container with the built image
                    sh "docker run -d --name ${CONTAINER_NAME} -p ${PORT_MAPPING} ${IMAGE_NAME}"
                }
            }
        }
    }
    
    post {
        success {
            // Notify or perform actions when the pipeline succeeds
            echo "Pipeline succeeded. Your application is deployed."
        }
        failure {
            // Notify or perform actions when the pipeline fails
            echo "Pipeline failed. Check the logs for details."
        }
    }
}
