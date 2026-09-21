
const doctors = [

    {
        name: "Dr. Peter Parker",
        specialization: "Cardiologist",
        education: "MBBS, MD - Cardiology",
        image: "../image/Doctor1.jpg"
    },

    {
        name: "Dr. Tony Stark",
        specialization: "Orthopedician",
        education: "MBBS, M.s",
        image: "../image/Doctor2.jpg"
    },

    {
        name: "Dr. Steve Rogers",
        specialization: "Pediatrician",
        education: "MBBS, MD - Pediatrics",
        image: "../image/Doctor3.png"
    }
,

    {
        name: "Dr. Thor",
        specialization: "General Physician",
        education: "MBBS, MD - General Medicine",
        image: "../image/Doctor4.jpg"
    },

    {
        name: "Dr. T'Challa",
        specialization: "General Surgeon",
        education: "MBBS, M.S",
        image: "../image/Doctor5.jpg"
    }
];


const doctorContainer =
    document.getElementById("doctor-container");


doctors.forEach(function(doctor) {

    const doctorCard =
        document.createElement("div");

    doctorCard.className = "doctor-card";


    doctorCard.innerHTML = `

        <img
            src="${doctor.image}"
            alt="${doctor.name}"
        >

        <div class="doctor-info">

            <h3>${doctor.name}</h3>

            <h4>${doctor.specialization}</h4>

            <p>
                <strong>Education:</strong>
                ${doctor.education}
            </p>

        </div>

    `;


    doctorContainer.appendChild(doctorCard);

});
