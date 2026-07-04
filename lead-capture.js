// ─────────────────────────────────────────────
// ANNIE LEE'S SHARED CONNECTION SYSTEM
// Table: food_truck_bookings
// ─────────────────────────────────────────────

const supabaseUrl = 'https://eqvnrulpudibuchsdsqi.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVxdm5ydWxwdWRpYnVjaHNkc3FpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAxNTc4MTgsImV4cCI6MjA5NTczMzgxOH0.-ChERjuPH6wkiIu8lT_D3kq-Fn857hUaf8k76vAE8xo';

window.supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

console.log('Lead Capture Connected');

async function saveLeadToSupabase(leadData) {
  const payload = {
    customer_name    : leadData.name          || leadData.customer_name || '',
    name             : leadData.name          || leadData.customer_name || '',
    phone            : leadData.phone         || '',
    email            : leadData.email         || '',
    event_type       : leadData.event_type    || leadData.type          || '',
    event_date       : leadData.event_date    || leadData.date          || null,
    event_time       : leadData.event_time    || leadData.time          || '',
    guest_count      : leadData.guest_count   || leadData.guests        || '',
    event_address    : leadData.event_address || leadData.location      || '',
    city             : leadData.city          || '',
    state            : leadData.state         || '',
    zip_code         : leadData.zip_code      || '',
    budget           : leadData.budget        || '',
    food_preferences : leadData.food_preferences || '',
    special_notes    : leadData.special_notes || leadData.message || leadData.details || leadData.notes || '',
    message          : leadData.special_notes || leadData.message || leadData.details || leadData.notes || '',
    status           : 'New',
    owner_notes      : ''
  };

  if (!payload.event_date) delete payload.event_date;

  const { data, error } = await window.supabaseClient
    .from('food_truck_bookings')
    .insert([payload]);

  if (error) {
    console.error('SUPABASE ERROR:', JSON.stringify(error, null, 2));
    alert('There was an error submitting your request. Please call us at (724) 385-0522.');
    return false;
  }

  console.log('Lead saved:', data);
  return true;
}

async function handleLeadSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const f = new FormData(form);
  const success = await saveLeadToSupabase({
    name          : f.get('name')          || '',
    phone         : f.get('phone')         || '',
    email         : f.get('email')         || '',
    event_date    : f.get('event_date')    || f.get('date')     || '',
    event_type    : f.get('event_type')    || f.get('type')     || '',
    event_time    : f.get('event_time')    || f.get('time')     || '',
    guest_count   : f.get('guest_count')   || f.get('guests')   || '',
    event_address : f.get('event_address') || f.get('location') || '',
    city          : f.get('city')          || '',
    state         : f.get('state')         || '',
    zip_code      : f.get('zip_code')      || '',
    budget        : f.get('budget')        || '',
    food_preferences: f.get('food_preferences') || '',
    special_notes : f.get('special_notes') || f.get('message') || f.get('details') || f.get('notes') || ''
  });
  if (success) { alert("Request submitted! We'll be in touch soon."); form.reset(); }
}

async function handleCateringSubmitGHL(event) {
  event.preventDefault();
  const form = event.target;
  const f = new FormData(form);
  const success = await saveLeadToSupabase({
    name          : f.get('name')        || '',
    phone         : f.get('phone')       || '',
    email         : f.get('email')       || '',
    event_date    : f.get('event_date')  || f.get('date')   || '',
    guest_count   : f.get('guest_count') || f.get('guests') || '',
    special_notes : f.get('details')     || f.get('message') || f.get('notes') || '',
    event_type    : 'Catering'
  });
  if (success) {
    const box = document.getElementById('form-success');
    if (box) { box.classList.add('show'); setTimeout(() => box.classList.remove('show'), 7000); }
    else { alert("Catering request submitted! We'll be in touch soon."); }
    form.reset();
  }
}
