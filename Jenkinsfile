pipeline {
    agent any

    options {
        skipDefaultCheckout(true)
    }
    
    environment {
        IMAGE_NAME = 'ssafysong/inside-movie'
        TAG = 'fe'
        CONTAINER_NAME = 'frontend'
        DOCKER_CREDENTIALS_ID = 'movie'
        PEM_FILE = "/var/jenkins_home/.ssh/book-key.pem"
    }

    stages {
        stage('Docker Build') {
            steps {
                script {
                    sh "docker build --no-cache -t ${IMAGE_NAME}:${TAG} ."
                }
            }
        }

        stage('Docker Push') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: "${DOCKER_CREDENTIALS_ID}",
                    usernameVariable: 'DOCKER_USERNAME',
                    passwordVariable: 'DOCKER_PASSWORD'
                )]) {
                    sh """
                    echo \$DOCKER_PASSWORD | docker login -u \$DOCKER_USERNAME --password-stdin
                    docker push ${IMAGE_NAME}:${TAG}
                    """
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                sshagent(['movie_SSH']) {
                    sh """
                    ssh -o StrictHostKeyChecking=no ubuntu@52.79.175.149 "
                        docker pull ${IMAGE_NAME}:${TAG} &&
                        docker stop ${CONTAINER_NAME} || true &&
                        docker rm ${CONTAINER_NAME} || true &&
                        docker run -d -p 5173:80 --name frontend ${IMAGE_NAME}:${TAG}
                    "
                    """
                }
            }
        }
    }
}
