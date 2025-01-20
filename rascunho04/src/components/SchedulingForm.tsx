import { useState } from 'react';
import { useAppointments } from '../hooks/useAppointments';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const SchedulingForm = () => {
  const { appointmentMutation, useAvailableSlots } = useAppointments();
  const [selectedDate, setSelectedDate] = useState('');
  
  const { data: availableSlots, isLoading: slotsLoading } = useAvailableSlots(selectedDate);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const patientData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
    };

    const appointmentData = {
      service_type: formData.get('service_type') as string,
      appointment_date: formData.get('appointment_date') as string,
      appointment_time: formData.get('appointment_time') as string,
    };

    try {
      await appointmentMutation.mutateAsync({ patientData, appointmentData });

      // Enviar mensagem para WhatsApp
      const message = encodeURIComponent(
        `*Novo Agendamento*\n\n` +
        `*Paciente:* ${patientData.name}\n` +
        `*Telefone:* ${patientData.phone}\n` +
        `*Email:* ${patientData.email}\n` +
        `*Serviço:* ${appointmentData.service_type}\n` +
        `*Data:* ${appointmentData.appointment_date}\n` +
        `*Horário:* ${appointmentData.appointment_time}`
      );

      const clinicWhatsApp = '5521999999999'; // Substituir pelo número real
      window.open(`https://api.whatsapp.com/send?phone=${clinicWhatsApp}&text=${message}`, '_blank');
    } catch (error) {
      console.error('Erro ao processar agendamento:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
      <div>
        <Input
          type="text"
          name="name"
          placeholder="Nome Completo"
          required
          className="w-full"
        />
      </div>

      <div>
        <Input
          type="tel"
          name="phone"
          placeholder="WhatsApp"
          required
          className="w-full"
        />
      </div>

      <div>
        <Input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="w-full"
        />
      </div>

      <div>
        <Select name="service_type" required>
          <SelectTrigger>
            <SelectValue placeholder="Selecione o Serviço" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="basic">Fisioterapia Básica</SelectItem>
            <SelectItem value="specialized">Fisioterapia Especializada</SelectItem>
            <SelectItem value="comprehensive">Plano Completo</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Input
          type="date"
          name="appointment_date"
          required
          className="w-full"
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      <div>
        <Select name="appointment_time" required disabled={!selectedDate || slotsLoading}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione o Horário" />
          </SelectTrigger>
          <SelectContent>
            {availableSlots?.map((time) => (
              <SelectItem key={time} value={time}>
                {time}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button 
        type="submit" 
        className="w-full"
        disabled={appointmentMutation.isPending}
      >
        {appointmentMutation.isPending ? 'Agendando...' : 'Agendar Consulta'}
      </Button>
    </form>
  );
};

export default SchedulingForm;