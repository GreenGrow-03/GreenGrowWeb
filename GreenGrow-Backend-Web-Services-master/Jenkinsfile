pipeline {
    agent any
    tools { 
        maven 'MAVEN_3_9_1'  
    }
	
    stages {
        stage ('Compile Stage') {

            steps {
                withMaven(maven : 'MAVEN_3_9_1') {
                    sh 'mvn clean compile'
                }
            }
        }

        stage ('Testing Stage') {

            steps {
                withMaven(maven : 'MAVEN_3_9_1') {
                    sh 'mvn test'
                }
            }
        }
    }
}
