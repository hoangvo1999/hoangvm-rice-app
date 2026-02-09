pipeline {
    agent any
    
    environment {
        // Khai báo biến để code sạch và dễ quản lý
        ECR_REGISTRY = "164693826317.dkr.ecr.ap-southeast-1.amazonaws.com"
        IMAGE_NAME = "hoangvm-rice-app"
        REGION = "ap-southeast-1"
    }

    stages {
        stage('Build & Push Image') {
            steps {
                // Jenkins sử dụng Credentials ID bạn đã tạo trên giao diện
                withCredentials([
                    string(credentialsId: 'AWS_ACCESS_KEY_ID', variable: 'AWS_ACCESS_KEY_ID'),
                    string(credentialsId: 'AWS_SECRET_ACCESS_KEY', variable: 'AWS_SECRET_ACCESS_KEY')
                ]) {
                    sh "aws ecr get-login-password --region ${env.REGION} | docker login --username AWS --password-stdin ${env.ECR_REGISTRY}"
                    
                    // Build image với tag latest
                    sh "docker build -t ${env.IMAGE_NAME} ."
                    
                    // Tag image để đẩy lên ECR
                    sh "docker tag ${env.IMAGE_NAME}:latest ${env.ECR_REGISTRY}/${env.IMAGE_NAME}:latest"
                    
                    // Đẩy image lên ECR
                    sh "docker push ${env.ECR_REGISTRY}/${env.IMAGE_NAME}:latest"
                }
            }
        }
    }
    
    post {
        success {
            echo 'CI hoàn tất thành công! Argo CD sẽ tự động cập nhật trang web sau vài giây.'
        }
        failure {
            echo 'Build thất bại. Vui lòng kiểm tra lại cấu hình hoặc log phía trên.'
        }
    }
}