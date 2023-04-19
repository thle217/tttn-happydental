export default function PageHeader() {
    return (
        <div className="container-fluid py-5 mb-5 wow fadeIn" data-wow-delay="0.1s">
            <img src={process.env.REACT_APP_PAGEHEADER} />
        </div>
    );
};