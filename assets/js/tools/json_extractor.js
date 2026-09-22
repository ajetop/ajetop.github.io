document.addEventListener('DOMContentLoaded', function () {

    const tabs = document.querySelectorAll('.json-tool-tab');
    const panes = document.querySelectorAll('.json-tool-tab-pane');

    tabs.forEach(tab => {

        tab.addEventListener('click', function () {

            const targetId =
                this.id === 'upload-tab'
                    ? 'upload-tab-pane'
                    : 'paste-tab-pane';

            tabs.forEach(item => {
                item.classList.remove('active');
            });

            panes.forEach(pane => {
                pane.classList.remove('active');
            });

            this.classList.add('active');

            const target = document.getElementById(targetId);

            if (target) {
                target.classList.add('active');
            }

        });

    });

});
function extractRows(obj) {
  if (!obj) return [];
  if (Array.isArray(obj)) return obj;
  if (obj.rows && Array.isArray(obj.rows)) return obj.rows;
  for (const k of Object.keys(obj)) {
    if (Array.isArray(obj[k])) return obj[k];
  }
  return [];
}
function stringify(v){ if (v===null||v===undefined) return ''; if (typeof v === 'object') return JSON.stringify(v); return String(v); }
function escapeHtml(s){ return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function escapeAttr(s){ return String(s||'').replace(/"/g,'&quot;'); }

// State
let mergedData = []; 
let allFields = []; 
let rombelFieldName = null; 
let jkFieldName = null;

// Elements
const fileInput = document.getElementById('fileInput');
const jsonPaste = document.getElementById('jsonPaste');
const processPasteBtn = document.getElementById('processPasteBtn');
const rombelContainer = document.getElementById('rombelContainer');
const jkFilterContainer = document.getElementById('jkFilterContainer');
const jkFilter = document.getElementById('jkFilter');
const globalSearch = document.getElementById('globalSearch');
const searchFields = document.getElementById('searchFields');
const fieldsContainer = document.getElementById('fieldsContainer');
const livePreview = document.getElementById('livePreview');
const previewHead = document.getElementById('previewHead');
const previewBody = document.getElementById('previewBody');
const stats = document.getElementById('stats');
const showing = document.getElementById('showing');

// Inti Pemrosesan Data (Digunakan oleh Upload maupun Paste)
async function processJSONStrings(jsonStringsArray) {
  mergedData = [];
  let tempFields = new Set();

  for (let i = 0; i < jsonStringsArray.length; i++) {
    try {
      const txt = jsonStringsArray[i];
      const obj = JSON.parse(txt);
      const rows = extractRows(obj);
      for (const r of rows) {
        mergedData.push(r);
        Object.keys(r).forEach(k => tempFields.add(k));
      }
    } catch (err) {
      alert('Gagal memproses JSON (File/Input ke-' + (i+1) + '):\n' + err.message);
      return;
    }
  }

  allFields = Array.from(tempFields).sort();
  populateFields(allFields);
  detectFields(mergedData, allFields);
  populateFilters();
  updatePreview();
}

// 1. Event: Upload File
fileInput.addEventListener('change', async (e) => {
  const files = Array.from(e.target.files);
  const jsonStrings = [];
  for (const f of files) {
    try {
      jsonStrings.push(await f.text());
    } catch (err) {
      alert('Gagal membaca file: ' + f.name);
      return;
    }
  }
  if (jsonStrings.length > 0) {
    processJSONStrings(jsonStrings);
  }
});

// 2. Event: Paste JSON
processPasteBtn.addEventListener('click', () => {
  const txt = jsonPaste.value.trim();
  if (!txt) {
    alert('Kotak JSON kosong. Silakan paste teks JSON terlebih dahulu.');
    return;
  }
  processJSONStrings([txt]);
});

function detectFields(data, fields) {
  const rombelCandidates = ['rombel','rombel_saat_ini','kelas','tingkat','kelas_saat_ini','rombel_lalu'];
  rombelFieldName = null;
  for (const c of rombelCandidates) if (fields.includes(c)) { rombelFieldName = c; break; }
  if (!rombelFieldName) {
    for (const f of fields) {
      if (f.toLowerCase().includes('kelas') || f.toLowerCase().includes('rombel')) { rombelFieldName = f; break; }
    }
  }

  const jkCandidates = ['jenis_kelamin', 'jk', 'gender', 'kelamin'];
  jkFieldName = null;
  for (const c of jkCandidates) if (fields.includes(c)) { jkFieldName = c; break; }
}

function populateFields(fields) {
  fieldsContainer.innerHTML = '';
  fields.forEach(k=>{
    const id = 'fld_'+k.replace(/[^a-z0-9_]/ig,'_');
    const div = document.createElement('div');
    div.className = 'form-check';
    div.innerHTML = `
      <input class="form-check-input fieldCheck" type="checkbox" value="${escapeAttr(k)}" id="${id}" checked>
      <label class="form-check-label" for="${id}">${escapeHtml(k)}</label>
    `;
    fieldsContainer.appendChild(div);
  });
}

function populateFilters() {
  if (rombelFieldName) {
    const set = new Set();
    mergedData.forEach(r=>{ const v = (r[rombelFieldName]||'').toString().trim(); if (v) set.add(v); });
    const arr = Array.from(set).sort((a,b) => a.localeCompare(b, undefined, {numeric:true}));
    
    rombelContainer.innerHTML = '';
    arr.forEach(x => {
      const id = 'rombel_'+x.replace(/[^a-z0-9]/ig,'_');
      const div = document.createElement('div');
      div.className = 'form-check';
      div.innerHTML = `
        <input class="form-check-input rombelCheck" type="checkbox" value="${escapeAttr(x)}" id="${id}" checked>
        <label class="form-check-label" for="${id}">${escapeHtml(x)}</label>
      `;
      rombelContainer.appendChild(div);
    });
  } else {
    rombelContainer.innerHTML = '<em class="text-muted small">Field kelas/rombel tidak terdeteksi.</em>';
  }

  if (jkFieldName) {
    jkFilterContainer.style.display = 'block';
    const set = new Set();
    mergedData.forEach(r=>{ const v = (r[jkFieldName]||'').toString().trim(); if (v) set.add(v); });
    const arr = Array.from(set).sort();
    jkFilter.innerHTML = '<option value="">-- (Semua) --</option>' + arr.map(x=>`<option value="${escapeAttr(x)}">${escapeHtml(x)}</option>`).join('');
  } else {
    jkFilterContainer.style.display = 'none';
  }
}

function getSelectedFields() {
  return Array.from(document.querySelectorAll('.fieldCheck:checked')).map(n=>n.value);
}

// Interactivity Listeners
searchFields.addEventListener('input', () => {
  const q = searchFields.value.toLowerCase();
  document.querySelectorAll('#fieldsContainer .form-check').forEach(div => {
    const label = div.querySelector('label').textContent.toLowerCase();
    div.style.display = label.includes(q) ? '' : 'none';
  });
});

document.getElementById('selectAllFieldsBtn').addEventListener('click', ()=>{ 
  document.querySelectorAll('#fieldsContainer .form-check').forEach(div => {
    if (div.style.display !== 'none') div.querySelector('.fieldCheck').checked = true;
  }); 
  if(livePreview.checked) updatePreview(); 
});
document.getElementById('deselectAllFieldsBtn').addEventListener('click', ()=>{ 
  document.querySelectorAll('#fieldsContainer .form-check').forEach(div => {
    if (div.style.display !== 'none') div.querySelector('.fieldCheck').checked = false;
  }); 
  if(livePreview.checked) updatePreview(); 
});

document.getElementById('selectAllRombelBtn').addEventListener('click', ()=>{ document.querySelectorAll('.rombelCheck').forEach(c=>c.checked=true); if(livePreview.checked) updatePreview(); });
document.getElementById('deselectAllRombelBtn').addEventListener('click', ()=>{ document.querySelectorAll('.rombelCheck').forEach(c=>c.checked=false); if(livePreview.checked) updatePreview(); });

rombelContainer.addEventListener('change', ()=>{ if (livePreview.checked) updatePreview(); });
jkFilter.addEventListener('change', ()=>{ if (livePreview.checked) updatePreview(); });
globalSearch.addEventListener('input', ()=>{ if (livePreview.checked) updatePreview(); });
fieldsContainer.addEventListener('change', ()=>{ if (livePreview.checked) updatePreview(); });

function applyFilters(data) {
  const selRombel = Array.from(document.querySelectorAll('.rombelCheck:checked')).map(n=>n.value);
  const hasRombelCheckboxes = document.querySelectorAll('.rombelCheck').length > 0;
  const jkVal = jkFieldName ? jkFilter.value.trim() : '';
  const q = globalSearch.value.trim().toLowerCase();
  
  return data.filter(r=>{
    // Filter Rombel
    if (rombelFieldName && hasRombelCheckboxes) {
      const rv = (r[rombelFieldName]||'').toString().trim();
      if (!selRombel.includes(rv)) return false;
    }
    // Filter Jenis Kelamin
    if (jkFieldName && jkVal) {
      const jv = (r[jkFieldName]||'').toString().trim();
      if (jv !== jkVal) return false;
    }
    // Global Search
    if (q) {
      const searchStr = Object.values(r).map(v => (v||'').toString().toLowerCase()).join(' ');
      if (!searchStr.includes(q)) return false;
    }
    return true;
  });
}

function updatePreview(limit=100) {
  const selFields = getSelectedFields();
  if (!mergedData.length) { previewHead.innerHTML=''; previewBody.innerHTML=''; stats.textContent='0 record'; showing.textContent='0'; return; }
  
  // Batasi kolom di preview agar tidak lemot jika field terlalu banyak
  const previewCols = selFields.slice(0, 20);
  previewHead.innerHTML = '<tr>' + previewCols.map(f=>`<th>${escapeHtml(f)}</th>`).join('') + (selFields.length > 20 ? '<th>...</th>' : '') + '</tr>';

  const filtered = applyFilters(mergedData);
  previewBody.innerHTML = '';
  const rows = filtered.slice(0, limit);
  
  rows.forEach(r=>{
    const tr = document.createElement('tr');
    tr.innerHTML = previewCols.map(f=>`<td>${escapeHtml(stringify(r[f]))}</td>`).join('') + (selFields.length > 20 ? '<td>...</td>' : '');
    previewBody.appendChild(tr);
  });
  
  stats.textContent = filtered.length + ' record';
  showing.textContent = Math.min(limit, filtered.length);
}

// Export Helpers
function toCSV(rows, fields) {
  const header = fields.join(',');
  const lines = rows.map(r=>{
    return fields.map(f=>{
      let val = r[f] === null || r[f] === undefined ? '' : String(r[f]);
      val = val.replace(/"/g,'""');
      return '"' + val + '"';
    }).join(',');
  });
  return header + '\n' + lines.join('\n');
}

function toExcel(rows, fields, sheetName = 'Data') {
  const excelData = rows.map(row => {
    const newRow = {};
    fields.forEach(field => { newRow[field] = row[field] !== null && row[field] !== undefined ? row[field] : ''; });
    return newRow;
  });
  const worksheet = XLSX.utils.json_to_sheet(excelData, { header: fields });
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  return XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
}

function downloadExcel(data, fileName) {
  const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
  saveAs(blob, fileName);
}
function downloadText(filename, text) {
  const blob = new Blob([text], {type: 'text/csv;charset=utf-8;'});
  saveAs(blob, filename);
}

// Export Actions
async function exportFilteredCSV() {
  const sel = getSelectedFields();
  if (!sel.length) { alert('Pilih minimal satu kolom.'); return; }
  const filtered = applyFilters(mergedData);
  if (!filtered.length) { alert('Tidak ada data yang sesuai filter.'); return; }
  downloadText('export_filtered.csv', toCSV(filtered, sel));
}

async function exportFilteredExcel() {
  const sel = getSelectedFields();
  if (!sel.length) { alert('Pilih minimal satu kolom.'); return; }
  const filtered = applyFilters(mergedData);
  if (!filtered.length) { alert('Tidak ada data yang sesuai filter.'); return; }
  downloadExcel(toExcel(filtered, sel, 'Data'), 'export_filtered.xlsx');
}

async function exportPerClassZip() {
  const sel = getSelectedFields();
  if (!sel.length) { alert('Pilih minimal satu kolom.'); return; }
  const filtered = applyFilters(mergedData);
  if (!filtered.length) { alert('Tidak ada data yang sesuai filter.'); return; }

  const zip = new JSZip();
  if (rombelFieldName) {
    const map = new Map();
    filtered.forEach(r=>{
      const key = (r[rombelFieldName]||'').toString().trim() || 'UNKNOWN';
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(r);
    });
    for (const [k, arr] of map.entries()) {
      const name = k.replace(/[^a-z0-9\-\_\.\s]/ig,'_').trim() || 'kelas';
      zip.file(`${name}.csv`, toCSV(arr, sel));
    }
  } else {
    if (!confirm('Field rombel tidak terdeteksi. Lanjutkan export semua data sebagai 1 file?')) return;
    zip.file('export_all.csv', toCSV(filtered, sel));
  }
  const content = await zip.generateAsync({type:'blob'});
  saveAs(content, 'export_per_class.zip');
}

async function exportExcelPerClassZip() {
  const sel = getSelectedFields();
  if (!sel.length) { alert('Pilih minimal satu kolom.'); return; }
  const filtered = applyFilters(mergedData);
  if (!filtered.length) { alert('Tidak ada data yang sesuai filter.'); return; }

  const zip = new JSZip();
  if (rombelFieldName) {
    const map = new Map();
    filtered.forEach(r=>{
      const key = (r[rombelFieldName]||'').toString().trim() || 'UNKNOWN';
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(r);
    });
    for (const [k, arr] of map.entries()) {
      const name = k.replace(/[^a-z0-9\-\_\.\s]/ig,'_').trim() || 'kelas';
      zip.file(`${name}.xlsx`, toExcel(arr, sel, k.substring(0, 31)));
    }
  } else {
    if (!confirm('Field rombel tidak terdeteksi. Lanjutkan export semua data sebagai 1 file?')) return;
    zip.file('export_all.xlsx', toExcel(filtered, sel, 'Data'));
  }
  const content = await zip.generateAsync({type:'blob'});
  saveAs(content, 'export_per_class_excel.zip');
}

document.getElementById('exportBtn').addEventListener('click', exportFilteredCSV);
document.getElementById('exportExcelBtn').addEventListener('click', exportFilteredExcel);
document.getElementById('exportPerClassBtn').addEventListener('click', exportPerClassZip);
document.getElementById('exportExcelPerClassBtn').addEventListener('click', exportExcelPerClassZip);

// Allow filtering manually if live preview is off
jsonPaste.addEventListener('input', ()=>{ if (!livePreview.checked && jsonPaste.value) { /* just optional */ } });
window.updatePreview = updatePreview;