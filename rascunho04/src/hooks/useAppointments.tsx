import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabaseClient';
import { toast } from 'sonner';

interface Patient {
  name: string;
  email: string;
  phone: string;
}

interface Appointment {
  service_type: string;
  appointment_date: string;
  appointment_time: string;
}

export const useAppointments = () => {
  const queryClient = useQueryClient();

  // Verificar disponibilidade do horário
  const checkAvailability = async (date: string, time: string) => {
    console.log('Checking availability for:', date, time);
    
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .eq('appointment_date', date)
      .eq('appointment_time', time)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw error;
    }

    return !data;
  };

  // Criar novo agendamento
  const createAppointment = async (patientData: Patient, appointmentData: Appointment) => {
    console.log('Creating appointment:', { patientData, appointmentData });

    // Primeiro, verificar disponibilidade
    const isAvailable = await checkAvailability(
      appointmentData.appointment_date,
      appointmentData.appointment_time
    );

    if (!isAvailable) {
      throw new Error('Este horário já está reservado');
    }

    // Criar ou buscar paciente
    const { data: patient, error: patientError } = await supabase
      .from('patients')
      .upsert(
        { 
          name: patientData.name,
          email: patientData.email,
          phone: patientData.phone 
        },
        { onConflict: 'email' }
      )
      .select()
      .single();

    if (patientError) throw patientError;

    // Criar agendamento
    const { data: appointment, error: appointmentError } = await supabase
      .from('appointments')
      .insert([
        {
          patient_id: patient.id,
          service_type: appointmentData.service_type,
          appointment_date: appointmentData.appointment_date,
          appointment_time: appointmentData.appointment_time
        }
      ])
      .select()
      .single();

    if (appointmentError) throw appointmentError;

    return { patient, appointment };
  };

  // Mutation para criar agendamento
  const appointmentMutation = useMutation({
    mutationFn: async ({ 
      patientData, 
      appointmentData 
    }: { 
      patientData: Patient; 
      appointmentData: Appointment 
    }) => {
      return createAppointment(patientData, appointmentData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      toast.success('Agendamento realizado com sucesso!');
    },
    onError: (error: Error) => {
      console.error('Erro ao criar agendamento:', error);
      toast.error(error.message || 'Erro ao realizar agendamento');
    }
  });

  // Query para buscar horários disponíveis
  const useAvailableSlots = (date: string) => {
    return useQuery({
      queryKey: ['availableSlots', date],
      queryFn: async () => {
        console.log('Fetching available slots for:', date);
        
        const { data: bookedSlots, error } = await supabase
          .from('appointments')
          .select('appointment_time')
          .eq('appointment_date', date);

        if (error) throw error;

        const allSlots = [
          '09:00', '10:00', '11:00',
          '14:00', '15:00', '16:00'
        ];

        const bookedTimes = bookedSlots.map(slot => slot.appointment_time);
        return allSlots.filter(slot => !bookedTimes.includes(slot));
      }
    });
  };

  return {
    appointmentMutation,
    useAvailableSlots
  };
};