/* groovylint-disable CompileStatic, DuplicateStringLiteral, LineLength, NoDef, UnnecessaryGString, UnusedVariable, VariableTypeRequired */

pipeline {
    options {
        disableConcurrentBuilds()
    }
    agent any
    stages {
        stage('Build') {
            steps {
                slackSend (color: 'warning', message: "START: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})", channel: "#jenkins")
                script {
                    def branchName = "${env.BRANCH_NAME}".toLowerCase().replaceAll("/", "_")

                    def dockerNet = "${branchName}-net"
                    def appImage = "${branchName}-app"
                    def testImage = "${branchName}-test"

                    sh "docker ps -a --filter name=${branchName} -q | xargs docker stop || true"
                    sh "docker ps -a --filter name=${branchName} -q | xargs docker rm || true"
                    sh "docker images --filter=reference='*${branchName}*:*' -q | xargs docker rmi || true"
                    sh "docker network ls --filter=name=${branchName}-* -q | xargs docker network rm || true"

                    sh "docker network create --driver bridge ${dockerNet}"

                    sh "docker build -t ${appImage} -f Dockerfile ."

                    sh "docker build -t test-env -f Test-env.Dockerfile ."

                    sh "docker build -t ${testImage} -f Test.Dockerfile ."
                }
            }
        }
        stage('Test') {
            steps {
                script {
                    def branchName = "${env.BRANCH_NAME}".toLowerCase().replaceAll("/", "_")

                    def dockerNet = "${branchName}-net"
                    def appImage = "${branchName}-app"
                    def testImage = "${branchName}-test"

                    sh "docker run -d --name ${appImage} --net ${dockerNet} ${appImage}"

                    sh "docker run --name ${testImage} --link ${appImage}:test-server --net ${dockerNet} ${testImage}"
                }
            }
        }
    }

    post {
        success {
            slackSend (color: 'good', message: "SUCCESSFUL: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})", channel: "#jenkins")
        }

        failure {
            slackSend (color: 'danger', message: "FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})", channel: "#jenkins")
        }

        always {
            script {
                def branchName = "${env.BRANCH_NAME}".toLowerCase().replaceAll("/", "_")

                def dockerNet = "${branchName}-net"
                def appImage = "${branchName}-app"
                def testImage = "${branchName}-test"

                sh "docker ps -a --filter name=${branchName} -q | xargs docker stop || true"
                sh "docker ps -a --filter name=${branchName} -q | xargs docker rm || true"
                sh "docker images --filter=reference='*${branchName}*:*' -q | xargs docker rmi || true"
                sh "docker network ls --filter=name=${branchName}-* -q | xargs docker network rm || true"
            }
            cleanWs()
        }
    }
}
