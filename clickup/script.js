const list_id = '';
async function getResponse (name, desc = '',dt_start, dt_end) {
  const resp = await fetch(
    `https://api.clickup.com/api/v2/list/${list_id}/task`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: ''
      },
      body: JSON.stringify({
        name: name,
        description: desc,
        due_date: Date.parse(dt_end),
        due_date_time: false,
        start_date: Date.parse(dt_start),
        start_date_time: false,
        notify_all: false,
        parent: null
      })
    }
  );
  return (await resp.json());
}
const form = document.getElementById("form");
form.addEventListener('submit', (e) => {
  e.preventDefault();
  document.getElementById("submit").innerHTML = `<span class="loading loading-infinity loading-lg"></span>`;
  const task = document.getElementById("task").value;
  const desc = document.getElementById("desc").value;
  const dt_start = document.getElementById("dt_start").value;
  const dt_end = document.getElementById("dt_end").value;
  try {
    const data = getResponse(task, desc, dt_start, dt_end);
    console.log(data);
  } catch (error) { console.error(error); }
  document.getElementById("output").innerHTML = `
    <div class="stats stats-vertical"><div class="stat place-items-center">
      <div class="stat-title">Task: ${task}</div>
      <div class="stat-desc">Description: ${desc}</div>
      <div class="stat-desc">Date: ${dt_start} to ${dt_end}</div>
    </div></div>
  `
})