import imageCompression from 'browser-image-compression';

export default class CommonUtils {


    //GIẢM KÍCH THƯỚC ẢNH
    static compressImage = async(file) => {
        const options = {
            maxSizeMB: 2,
            maxWidthOrHeight: 1920
        };
        const compressedFile = await imageCompression(file, options);
        return compressedFile;
    };


    //KIỂM TRA NGÀY SINH (NHÂN VIÊN PHẢI ĐỦ 18 TUỔI)
    static checkEmployeeAge = (dob) => {
        const currentDate = new Date();
        let dd = currentDate.getDate();
        let mm = currentDate.getMonth() + 1;
        let yyyy = currentDate.getFullYear();

        let dobDate = dob.getDate();
        let dobMonth = dob.getMonth() + 1;
        let dobYear = dob.getFullYear();

        if(yyyy - dobYear < 18) {
            return false;
        }
        else {
            if(yyyy - dobYear > 18) {
                return true;
            }

            //NẾU VỪA ĐỦ 18 TUỔI THÌ XÉT QUA THÁNG SINH
            else {
                if(mm - dobMonth < 0) {
                    return false;
                }
                else {
                    if(mm - dobMonth > 0) {
                        return true;
                    }

                    //NẾU THÁNG SINH VỪA ĐỦ THÌ XÉT QUA NGÀY
                    else {
                        if(dd - dobDate < 0) {
                            return false;
                        }
                        else {
                            return true;
                        };
                    };
                };
            };
        };
    };


    //KIỂM TRA SỐ ĐIỆN THOẠI
    static checkPhoneNumber = (phone) => {
        var vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
        return vnf_regex.test(phone);
    };


    //KIỂM TRA ĐỘ DÀI MẬT KHẨU
    static checkPasswordLength = (password) => {
        if(password.length < 6 || password.length > 20) {
            return false;
        }
        else {
            return true;
        }
    };
};