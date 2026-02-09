
pipeline {
    agent any
    stage('Build & Push Image') {
    steps {
        withCredentials([...]) {
            // Jenkins build và đẩy image với Tag theo số lần build (BUILD_NUMBER)
            sh "docker build -t hoangvm-rice-app:${env.BUILD_NUMBER} ."
            sh "docker tag hoangvm-rice-app:${env.BUILD_NUMBER} 164693826317.dkr.ecr.ap-southeast-1.amazonaws.com/hoangvm-rice-app:${env.BUILD_NUMBER}"
            sh "docker push 164693826317.dkr.ecr.ap-southeast-1.amazonaws.com/hoangvm-rice-app:${env.BUILD_NUMBER}"
        }
    }
}

// THAY THẾ STAGE DEPLOY CŨ BẰNG STAGE NÀY
stage('Update Manifest in GitHub') {
    steps {
        // Lệnh dùng sed để sửa file deployment.yaml từ 'latest' sang số version mới
        sh "sed -i 's/:latest/:${env.BUILD_NUMBER}/g' deployment.yaml"
        sh "git add deployment.yaml"
        sh "git commit -m 'Update image to version ${env.BUILD_NUMBER}'"
        sh "git push origin main"
    }
}
}