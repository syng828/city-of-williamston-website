/* Requires the Docker Pipeline plugin */
pipeline {
    agent { docker { image 'python:3.11.5-alpine3.18' } }
    stages {
        stage('build') {
            steps {
                sh 'python --version'
            }
        }
        stage('Build') {
            steps {
                bat 'set'
            }
        }
        stage('Deploy') {
            steps {
                retry(3) {
                    sh './flakey-deploy.sh'
                }

                timeout(time: 3, unit: 'MINUTES') {
                    sh './health-check.sh'
                }
            }
        }
    }
}

