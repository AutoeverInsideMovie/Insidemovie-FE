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
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Docker Build') {
            steps {
                script {
                    sh 'pwd'          // 현재 작업 디렉터리 출력
                    sh 'ls -al'       // 현재 디렉터리 파일 목록 확인
                    sh 'ls -al ./Dockerfile'  // Dockerfile 존재 확인
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
