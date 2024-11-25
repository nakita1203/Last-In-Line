import React from "react";

const login = () => {
    return (
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            <div style={{ width: 369, height: 539, left: 15, top: 12, position: 'absolute', background: '#5B778D', borderRadius: 10 }} />
            <div style={{ width: 369, height: 539, left: 0, top: 0, position: 'absolute', background: '#F1F1F1', borderRadius: 10, border: '1px black solid' }} />
            <div style={{ left: 100, top: 93, position: 'absolute', color: 'black', fontSize: 32, fontFamily: 'League Spartan', fontWeight: '600', wordWrap: 'break-word' }}>Please Login</div>
            <div style={{ width: 304, height: 45, left: 36, top: 218, position: 'absolute', background: '#F4F4F4', borderRadius: 5, border: '1.50px rgba(27.78, 78.51, 105.83, 0.30) solid' }} />
            <div style={{ width: 304, height: 45, left: 36, top: 159, position: 'absolute', background: '#F4F4F4', borderRadius: 5, border: '1.50px rgba(27.78, 78.51, 105.83, 0.30) solid' }} />
            <div style={{ width: 304, height: 45, left: 36, top: 374, position: 'absolute', background: '#100909', borderRadius: 5, border: '1.50px rgba(27.78, 78.51, 105.83, 0.30) solid' }} />
            <div style={{ width: 304, height: 45, left: 36, top: 426, position: 'absolute', background: 'white', borderRadius: 5, border: '1.50px rgba(27.78, 78.51, 105.83, 0.30) solid' }} />
            <div style={{ width: 20, height: 20, left: 39, top: 288, position: 'absolute', borderRadius: 5, border: '1.50px #B4B7B9 solid' }} />
            <div style={{ left: 67, top: 292, position: 'absolute', color: 'black', fontSize: 14, fontFamily: 'League Spartan', fontWeight: '500', wordWrap: 'break-word' }}>Remember me</div>
            <div style={{ left: 78, top: 488, position: 'absolute', color: 'black', fontSize: 14, fontFamily: 'League Spartan', fontWeight: '500', wordWrap: 'break-word' }}>Don’t have an account?</div>
            <div style={{ left: 230, top: 488, position: 'absolute', color: '#0063C0', fontSize: 14, fontFamily: 'League Spartan', fontWeight: '500', wordWrap: 'break-word' }}>Sign Up</div>
            <div style={{ left: 49, top: 176, position: 'absolute', color: '#9DAAB4', fontSize: 14, fontFamily: 'League Spartan', fontWeight: '500', wordWrap: 'break-word' }}>E-mail address or username</div>
            <div style={{ left: 236, top: 292, position: 'absolute', color: '#004687', fontSize: 14, fontFamily: 'League Spartan', fontWeight: '500', wordWrap: 'break-word' }}>Forgot password?</div>
            <div style={{ left: 52, top: 234, position: 'absolute', color: '#9DAAB4', fontSize: 14, fontFamily: 'League Spartan', fontWeight: '500', wordWrap: 'break-word' }}>Password</div>
            <div style={{ left: 164, top: 390, position: 'absolute', color: 'white', fontSize: 14, fontFamily: 'League Spartan', fontWeight: '600', wordWrap: 'break-word' }}>Sign in</div>
            <div style={{ width: 125, height: 17, left: 130, top: 443, position: 'absolute', color: 'black', fontSize: 14, fontFamily: 'League Spartan', fontWeight: '600', wordWrap: 'break-word', display: 'flex', alignItems: 'center' }}>
                <img src={'../assets/logo_google.png'} alt="Google Logo" />
                Sign in with Google
            </div>
            <div style={{ left: 328, top: 13, position: 'absolute', color: 'black', fontSize: 40, fontFamily: 'League Spartan', fontWeight: '400', wordWrap: 'break-word' }}>×</div>
        </div>
    );
}

export default login;