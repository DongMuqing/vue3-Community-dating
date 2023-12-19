import ossUtil from "@/api/admin/oss";
import { ElMessage } from 'element-plus'; // 导入Element UI的消息通知
export function uploadPostImage(fileList) {
    return checkAndUploadFiles(fileList, ossUtil.uploadPostImage);
}

export function uploadArticleImage(fileList) {
    return checkAndUploadFiles(fileList, ossUtil.uploadArticleImage)
}

export function uploadAvatar(fileList) {
    return checkAndUploadFiles(fileList, ossUtil.uploadAvatar)
}

function checkAndUploadFiles(fileList, uploadMethod) {
    return new Promise((resolve, reject) => {
        if (fileList.length > 0) {
            const formData = new FormData();
            for (const file of fileList) {
                formData.append('files', file.raw);
            }

            uploadMethod(formData)
                .then(res => {
                    resolve(res.data.data);
                })
                .catch(error => {
                    reject(error);
                });
        } else {
            ElMessage({
                message: "上传文件不可为空！",
                type: 'warning'
            });
        }
    });
}

