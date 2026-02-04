
pipeline {
    agent any
    stages {
        stage('Build & Push Image') {
            steps {
                // Jenkins sẽ dùng chìa khóa bạn vừa tạo để thực hiện lệnh
                withCredentials([string(credentialsId: 'AWS_ACCESS_KEY_ID', variable: 'AWS_ACCESS_KEY_ID'),
                                 string(credentialsId: 'AWS_SECRET_ACCESS_KEY', variable: 'AWS_SECRET_ACCESS_KEY')]) {
                    
                    sh "aws ecr get-login-password --region ap-southeast-1 | docker login --username AWS --password-stdin 164693826317.dkr.ecr.ap-southeast-1.amazonaws.com"
                    sh 'docker build -t hoangvm-rice-app .'
                    sh 'docker tag hoangvm-rice-app:latest 164693826317.dkr.ecr.ap-southeast-1.amazonaws.com/hoangvm-rice-app:latest'
                    sh 'docker push 164693826317.dkr.ecr.ap-southeast-1.amazonaws.com/hoangvm-rice-app:latest'
                }
            }
        }
        stage('Deploy to EKS') {
            steps {
                withCredentials([string(credentialsId: 'AWS_ACCESS_KEY_ID', variable: 'AWS_ACCESS_KEY_ID'),
                                 string(credentialsId: 'AWS_SECRET_ACCESS_KEY', variable: 'AWS_SECRET_ACCESS_KEY')]) {
                    
                    sh 'aws eks update-kubeconfig --region ap-southeast-1 --name hoangvm-rice-cluster'
                    sh 'kubectl apply -f deployment.yaml'
                }
            }
        }
    }
}