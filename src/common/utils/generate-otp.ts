export function generateOTP(): Promise<string> {
    return new Promise((resolve) => {
        const otp = Math.floor(100000 + Math.random() * 900000);
        resolve(otp.toString());
    });
}
