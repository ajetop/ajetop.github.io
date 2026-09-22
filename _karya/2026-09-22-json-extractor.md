---
layout: karya
title: "JSON → CSV & Excel Converter — Advanced"
cat: "app"
year: 2026
desc: "JSON → CSV & Excel Converter — Advanced"
thumb: 1
extra_css:
  - "/assets/css/tools/json-extractor.css"
  - "/assets/css/tools/styles.css"
extra_js:
  - "https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js"
  - "https://cdn.jsdelivr.net/npm/file-saver@2.0.5/dist/FileSaver.min.js"
  - "https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js"
  - "/assets/js/tools/json_extractor.js"
---
<div class="json-tool">

    <div class="json-tool-layout">

        <!-- =================================================
             LEFT SIDEBAR
        ================================================== -->

        <div class="json-tool-sidebar">


            <!-- =============================================
                 1. INPUT DATA
            ============================================== -->

            <div class="json-tool-card">

                <h3 class="json-tool-title">
                    <span class="json-tool-number">1</span>
                    Masukkan Data JSON
                </h3>


                <!-- Tabs -->

                <div class="json-tool-tabs">

                    <button
                        type="button"
                        class="json-tool-tab active"
                        id="upload-tab"
                    >
                        Upload File
                    </button>

                    <button
                        type="button"
                        class="json-tool-tab"
                        id="paste-tab"
                    >
                        Paste JSON
                    </button>

                </div>


                <!-- Upload -->

                <div
                    class="json-tool-tab-pane active"
                    id="upload-tab-pane"
                >

                    <p class="json-tool-help">
                        Pilih satu atau lebih file
                        <code>.json</code>
                        untuk diproses.
                    </p>

                    <input
                        id="fileInput"
                        type="file"
                        accept="application/json,.json"
                        multiple
                    >

                </div>


                <!-- Paste -->

                <div
                    class="json-tool-tab-pane"
                    id="paste-tab-pane"
                >

                    <p class="json-tool-help">
                        Paste teks JSON langsung ke kotak di bawah.
                    </p>

                    <textarea
                        id="jsonPaste"
                        class="json-tool-textarea"
                        rows="5"
                        placeholder='{"rows": [...]} atau [...]'
                    ></textarea>

                    <button
                        type="button"
                        id="processPasteBtn"
                        class="json-tool-btn json-tool-btn-primary"
                        style="width:100%; margin-top:10px;"
                    >
                        Proses JSON
                    </button>

                </div>


                <div class="json-tool-divider"></div>


                <!-- =========================================
                     2. FILTER DATA
                ========================================== -->

                <h3 class="json-tool-title">
                    <span class="json-tool-number">2</span>
                    Filter Data
                </h3>


                <!-- Rombel -->

                <div class="json-tool-field">

                    <label class="json-tool-label">
                        Pilih Kelas (Rombel)
                    </label>

                    <div class="json-tool-actions" style="margin-bottom:9px;">

                        <button
                            type="button"
                            id="selectAllRombelBtn"
                            class="json-tool-btn json-tool-btn-outline-primary"
                        >
                            Pilih Semua
                        </button>

                        <button
                            type="button"
                            id="deselectAllRombelBtn"
                            class="json-tool-btn json-tool-btn-outline-secondary"
                        >
                            Kosongkan
                        </button>

                    </div>

                    <div
                        id="rombelContainer"
                        class="json-tool-scroll-box"
                    >
                        <em class="json-tool-empty">
                            Belum ada file/data yang dimuat.
                        </em>
                    </div>

                </div>


                <!-- JK -->

                <div
                    class="json-tool-field"
                    id="jkFilterContainer"
                    style="display:none;"
                >

                    <label
                        for="jkFilter"
                        class="json-tool-label"
                    >
                        Filter Jenis Kelamin
                    </label>

                    <select
                        id="jkFilter"
                        class="json-tool-select"
                    >
                        <option value="">
                            -- (Semua) --
                        </option>
                    </select>

                </div>


                <!-- Search -->

                <div class="json-tool-field">

                    <label
                        for="globalSearch"
                        class="json-tool-label"
                    >
                        Pencarian Global
                    </label>

                    <input
                        id="globalSearch"
                        type="search"
                        class="json-tool-input"
                        placeholder="Cari nama, NISN, NIK, dll..."
                    >

                </div>


                <!-- Live Preview -->

                <label
                    class="json-tool-switch"
                    for="livePreview"
                >

                    <input
                        id="livePreview"
                        type="checkbox"
                        checked
                    >

                    <span>
                        Tampilkan preview saat filter berubah
                    </span>

                </label>

            </div>


            <!-- =============================================
                 3. PILIH KOLOM
            ============================================== -->

            <div class="json-tool-card">

                <h3 class="json-tool-title">
                    <span class="json-tool-number">3</span>
                    Pilih Kolom Export
                </h3>


                <div class="json-tool-field">

                    <input
                        id="searchFields"
                        type="search"
                        class="json-tool-input"
                        placeholder="Cari kolom..."
                    >

                </div>


                <div
                    class="json-tool-actions"
                    style="margin-bottom:9px;"
                >

                    <button
                        type="button"
                        id="selectAllFieldsBtn"
                        class="json-tool-btn json-tool-btn-outline-primary"
                    >
                        Pilih Semua
                    </button>

                    <button
                        type="button"
                        id="deselectAllFieldsBtn"
                        class="json-tool-btn json-tool-btn-outline-secondary"
                    >
                        Kosongkan
                    </button>

                </div>


                <div
                    id="fieldsContainer"
                    class="json-tool-scroll-box"
                    style="max-height:250px;"
                >
                    <em class="json-tool-empty">
                        Belum ada data.
                    </em>
                </div>

            </div>


            <!-- =============================================
                 4. EXPORT
            ============================================== -->

            <div class="json-tool-card">

                <h3 class="json-tool-title">
                    <span class="json-tool-number">4</span>
                    Ekspor Data
                </h3>


                <div class="json-tool-export-grid">

                    <button
                        type="button"
                        id="exportBtn"
                        class="json-tool-export-btn json-tool-export-btn-primary"
                    >
                        Export CSV
                    </button>

                    <button
                        type="button"
                        id="exportExcelBtn"
                        class="json-tool-export-btn json-tool-export-btn-excel"
                    >
                        Export Excel
                    </button>

                    <button
                        type="button"
                        id="exportPerClassBtn"
                        class="json-tool-export-btn json-tool-export-btn-outline"
                    >
                        Export per kelas (CSV ZIP)
                    </button>

                    <button
                        type="button"
                        id="exportExcelPerClassBtn"
                        class="json-tool-export-btn json-tool-export-btn-outline"
                    >
                        Export per kelas (Excel ZIP)
                    </button>

                </div>

            </div>

        </div>


        <!-- =================================================
             RIGHT: PREVIEW
        ================================================== -->

        <div class="json-tool-preview">

            <div class="json-tool-card json-tool-preview-card">

                <div class="json-tool-preview-header">

                    <h3 class="json-tool-preview-title">
                        Preview Data
                    </h3>

                    <div class="json-tool-stats">

                        <strong id="stats">
                            0 record
                        </strong>

                        <span>
                            &nbsp;·&nbsp; Menampilkan max
                            <strong id="showing">0</strong>
                            baris
                        </span>

                    </div>

                </div>


                <div class="json-tool-table-wrapper">

                    <table
                        id="previewTable"
                    >

                        <thead
                            id="previewHead"
                        ></thead>

                        <tbody
                            id="previewBody"
                        ></tbody>

                    </table>

                </div>

            </div>

        </div>

    </div>

</div>
