import { COMPANIES } from "./companies";

// Mapping of KAP IDs to their names
export const KAP_NAMES: Record<string, string> = {
    kap_amir_abadi_jusuf_aryanto_mawar_dan_rekan: "KAP Amir Abadi Jusuf, Aryanto, Mawar dan Rekan (RSM)",
    kap_djoko_sidik_dan_indra: "KAP Djoko, Sidik dan Indra (Antea International)",
    kap_gani_sidiro_dan_handayani: "KAP Gani Sidiro dan Handayani",
    kap_heliantono_dan_rekan: "KAP Heliantono dan Rekan (Parker Russel International)", // Update with actual KAP name
    kap_kanaka_puradiredja_suhartono: "KAP Kanaka, Puradiredja, Suhartono (Nexia KPS)", // Update with actual KAP name
    kap_lianaxenia_ramon_dan_rekan: "KAP Liana Ramon Xenia dan Rekan (Deloitte Touche Tohmatsu)", // Update with actual KAP name
    kap_paul_hadiwinata_hidajat_arsono_retno_palilingan_dan_rekan: "KAP Paul Hadiwinata, Hidajat, Arsono, Retno, Palilingan & Rekan (PKF International)", // Update with actual KAP name
    kap_purwanto_susanti_dan_surja: "KAP Purwanto, Susanti dan Surja (Ernst and Young)", // Update with actual KAP name
    kap_rintis_jumadi_rianto_dan_rekan: "KAP Rintis, Jumadi, Rianto dan Rekan (Pricewaterhouse Coopers)", // Update with actual KAP name
};

// Mapping of KAP IDs to their client lists
// Each KAP has a subset of the 78 companies
export const KAP_CLIENT_MAPPING: Record<string, string[]> = {
    kap_amir_abadi_jusuf_aryanto_mawar_dan_rekan: [
        "PT Mineral Industri Indonesia (Persero)",
        "PT Aneka Tambang Indonesia Tbk",
        "PT Bukit Asam Tbk",
        "PT Indonesia Asahan Alumunium",
        "PT Timah Tbk",
        "PT Rajawali Nusantara Indonesia (Persero)",
        "PT Perusahaan Perdagangan Indonesia",
        "PT Sang Hyang Seri",
        "PT Perikanan Indonesia",
        "PT Berdikari",
        "PT Garam",
        "PT Krakatau Steel (Persero) Tbk",
        "PT Pembangunan Perumahan (Persero) Tbk",
        "PT Adhi Karya (Persero) Tbk",
        "PT Wijaya Karya (Persero) Tbk",
        "PT Jasa Marga (Persero) Tbk",
        "PT ASDP Indonesia Ferry (Persero)",
        "PT Kereta Api Indonesia (Persero)",
        "PT Danareksa (Persero)"
    ],
    kap_djoko_sidik_dan_indra: [
        "PT Pelayaran Nasional Indonesia (Persero)"
    ],
    kap_gani_sidiro_dan_handayani: [
        "PT LEN Industri (Persero)",
        "PT Dirgantara Indonesia",
        "PT Pindad",
        "PT PAL Indonesia",
        "PT Dahana"
    ],
    kap_heliantono_dan_rekan: [
        "PT Brantas Abipraya (Persero)",
        "PT Waskita Karya (Persero) Tbk",
        "PT Biofarma (Persero)",
        "PT Kimia Farma Tbk",
        "PT Indofarma Tbk"
    ],
    kap_kanaka_puradiredja_suhartono: [
        "PT Pos Indonesia (Persero)"
    ],
    kap_lianaxenia_ramon_dan_rekan: [
        "PT Semen Indonesia (Persero) Tbk",
        "PT Semen Padang",
        "PT Semen Gresik",
        "PT Semen Tonasa",
        "PT Semen Baturaja Tbk"
    ],
    kap_paul_hadiwinata_hidajat_arsono_retno_palilingan_dan_rekan: [
        "PT Sucofindo",
        "PT Surveyor Indonesia",
        "PT Industri Kereta Api (Persero)"
    ],
    kap_purwanto_susanti_dan_surja: [
        "PT Aviasi Pariwisata Indonesia (Persero)",
        "PT Angkasa Pura Indonesia",
        "PT Hotel Indonesia Natour",
        "PT Sarinah",
        "PT Taman Wisata Candi Borobudur, Prambanan dan Ratu Boko",
        "PT Pengembangan Pariwisata Indonesia",
        "PT Pelabuhan Indonesia (Persero)",
        "PT Pelindo Terminal Petikemas",
        "PT Pelindo Multi Terminal",
        "PT Pelindo Solusi Logistik",
        "PT Pelindo Jasa Maritim",
        "PT Pertamina (Persero)",
        "PT Pertamina Hulu Energi",
        "PT Kilang Pertamina Internasional",
        "PT Pertamina Patra Niaga",
        "PT Perusahaan Gas Negara Tbk",
        "PT Pertamina Power Indonesia",
        "PT Telkom (Persero), Tbk",
        "PT Telekomunikasi Selular",
        "PT Dayamitra Telekomunikasi Tbk"
    ],
    kap_rintis_jumadi_rianto_dan_rekan: [
        "PT Pupuk Indonesia (Persero)",
        "PT Petrokimia Gresik",
        "PT Pupuk Kujang",
        "PT Pupuk Kaltim",
        "PT Pupuk Iskandar Muda",
        "PT Pupuk Sriwijaya Palembang",
        "PT Rekayasa Industri",
        "PT Pupuk Indonesia Niaga",
        "PT Pupuk Indonesia Pangan",
        "PT Hutama Karya (Persero)",
        "PT Garuda Indonesia (Persero) Tbk",
        "PT Garuda Maintenance Facility Aero Asia Tbk",
        "PT Citilink Indonesia",
        "PT Perkebunan Nusantara III (Persero)",
        "PT Perkebunan Nusantara I",
        "PT Perkebunan Nusantara IV",
        "PT Perusahaan Listrik Negara (Persero)",
        "PT PLN Indonesia Power"
    ],
};

// Helper function to get client list for a KAP ID
export function getKapClients(kapId: string | null): string[] {
    if (!kapId) {
        // Default: return all companies if no KAP ID specified
        return COMPANIES;
    }
    return KAP_CLIENT_MAPPING[kapId] || COMPANIES;
}

// Helper function to get KAP name for a KAP ID
export function getKapName(kapId: string | null): string | null {
    if (!kapId) {
        return null;
    }
    return KAP_NAMES[kapId] || null;
}

// Get all valid KAP IDs
export function getKapIds(): string[] {
    return Object.keys(KAP_CLIENT_MAPPING);
}

