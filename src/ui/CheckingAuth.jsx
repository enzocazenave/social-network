
export const CheckingAuth = () => {
    return (
        <div 
            className="container-fluid d-flex justify-content-center align-items-center" 
            style={{
                minHeight: '100vh',
                backgroundColor: '#1877f2',
            }}
        >
            <div className="spinner-grow text-primary m-2" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-grow text-secondary m-2" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-grow text-info m-2" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-grow text-light m-2" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-grow text-dark" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}
