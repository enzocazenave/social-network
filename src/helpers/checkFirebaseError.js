export const checkFirebaseError = (error = '') => {
    if (error == 'Firebase: Error (auth/user-not-found).') return "El usuario no fue encontrado";
    else if (error == 'Firebase: Error (auth/invalid-email).') return "El usuario es inválido";
    else if (error == 'Firebase: Error (auth/wrong-password') return 'Contraseña incorrecta';
    else if (error == 'Firebase: Error (auth/email-already-in-use).') return 'El correo electrónico está en uso';
    else if (error == 'Firebase: Error (auth/internal-error).') return 'Error de autenticación';
}
