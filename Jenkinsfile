pipeline {
    agent any

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
