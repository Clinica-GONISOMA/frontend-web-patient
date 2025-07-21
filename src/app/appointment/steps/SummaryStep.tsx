import React from 'react';

interface SummaryProps {
    selectedIdType: 'rut' | 'pasaporte';
    idNumber: string;
    selectedInsurance: string;
    selectedServiceType: string;
    selectedAttentionType: string;
    selectedAttentionPlace: string;
    selectedRegion: string;
    selectedCommune: string;
    selectedSpecialty: string;
    selectedPsychiatricAttentionType: string;
    selectedDoctor: string;
    selectedDate: string;
    selectedTime: string;
}

export default function SummaryStep({
    selectedIdType, idNumber, selectedInsurance,
    selectedServiceType, selectedAttentionType, selectedAttentionPlace,
    selectedRegion, selectedCommune,
    selectedSpecialty, selectedPsychiatricAttentionType, selectedDoctor,
    selectedDate, selectedTime,
}: SummaryProps) {
    return (
        <div className="space-y-4 text-left">
            <h2 className="text-xl font-semibold">Resumen de tu cita</h2>

            <p><strong>Identificación:</strong> {selectedIdType === 'rut' ? 'RUT' : 'Pasaporte'} – {idNumber}</p>
            <p><strong>Previsión:</strong> {selectedInsurance}</p>
            <p><strong>Servicio:</strong> {
                {
                    consultation: 'Consulta médica',
                    examination: 'Exámenes',
                    procedure: 'Procedimiento',
                }[selectedServiceType]
            }</p>

            {/* Solo para consulta */}
            {selectedServiceType === 'consultation' && (
                <>
                    <p><strong>Tipo de atención:</strong> {
                        {
                            presencial: 'Presencial',
                            remote: 'Telemedicina',
                            onSite: 'Domicilio',
                        }[selectedAttentionType]
                    }</p>

                    {selectedAttentionType === 'onSite' && (
                        <p><strong>Ubicación:</strong> Región {selectedRegion}, Comuna {selectedCommune}</p>
                    )}

                    <p><strong>Especialidad:</strong> {selectedSpecialty}</p>
                    {selectedSpecialty === 'psychiatry' && (
                        <p><strong>Atención psiquiátrica:</strong> {
                            {
                                admission: 'Ingreso',
                                consultation: 'Consulta',
                            }[selectedPsychiatricAttentionType]
                        }</p>
                    )}
                    <p><strong>Médico/a:</strong> {selectedDoctor}</p>
                </>
            )}

            {/* Para exámenes y procedimientos solo mostramos lugar de atención */}
            {(selectedServiceType === 'examination' || selectedServiceType === 'procedure') && (
                <p><strong>Lugar de atención:</strong> {selectedAttentionPlace}</p>
            )}

            {/* Fecha y hora */}
            {selectedDate && selectedTime && (
                <p><strong>Fecha y hora:</strong> {selectedDate} a las {selectedTime}</p>
            )}
        </div>
    );
}
