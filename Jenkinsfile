pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Image_Remove') {
		    steps {
                // sh 'docker rm -f blockstack || ture'
                // sh 'docker rmi -f blockstack'
                // echo 'Docker image remove successfull in dev server.'
                echo 'Show Docker Images....................'
                sh 'docker images'
                echo 'Show Docker Container in list...............'
                sh 'docker ps'
		    }
	    }

        stage('Build Docker Image') {
            steps {
                script {
                    echo 'Building Docker Image..'
                    sh 'docker build -t blockstack:latest .'
                    echo 'Docker Image successfully Build in dev server'
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    echo 'Runnign Docker new Image..'
                    sh 'docker run --restart always -p 4000:4000 -d --name blockstack blockstack:latest'
                    echo 'Docker image deployed successfull in dev server'
                    echo 'Show Docker Images....................'
                    sh 'docker images'
                    sh 'docker ps'
                    sh 'docker ps -a'
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
