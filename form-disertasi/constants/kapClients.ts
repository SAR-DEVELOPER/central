import { COMPANIES } from "./companies";

// Mapping of KAP IDs to their names
export const KAP_NAMES: Record<string, string> = {
    kap_amir_abadi_jusuf_aryanto_mawar_dan_rekan: "KAP Amir Abadi Jusuf, Aryanto, Mawar dan Rekan (RSM)",
    kap_djoko_sidik_dan_indra: "KAP Djoko, Sidik dan Indra (Antea International)",
    kap_gani_sidiro_dan_handayani: "KAP Gani Sidiro dan Handayani",
    kap_heliantono_dan_rekan: "KAP Heliantono dan Rekan (Parker Russel International)",
    kap_kanaka_puradiredja_suhartono: "KAP Kanaka, Puradiredja, Suhartono (Nexia KPS)",
    kap_lianaxenia_ramon_dan_rekan: "KAP Liana Ramon Xenia dan Rekan (Deloitte Touche Tohmatsu)",
    kap_paul_hadiwinata_hidajat_arsono_retno_palilingan_dan_rekan: "KAP Paul Hadiwinata, Hidajat, Arsono, Retno, Palilingan & Rekan (PKF International)",
    kap_purwanto_susanti_dan_surja: "KAP Purwanto, Susanti dan Surja (Ernst and Young)",
    kap_rintis_jumadi_rianto_dan_rekan: "KAP Rintis, Jumadi, Rianto dan Rekan (Pricewaterhouse Coopers)",
};

// Mapping of KAP IDs to their client lists
// Each KAP has a subset of the 78 companies
export const KAP_CLIENT_MAPPING: Record<string, string[]> = {
    kap_amir_abadi_jusuf_aryanto_mawar_dan_rekan: [
        "PT Adhi Karya (Persero) Tbk",
        "PT Aneka Tambang Indonesia Tbk",
        "PT ASDP Indonesia Ferry (Persero)",
        "PT Berdikari",
        "PT Bukit Asam Tbk",
        "PT Danareksa (Persero)",
        "PT Garam",
        "PT Indonesia Asahan Alumunium",
        "PT Jasa Marga (Persero) Tbk",
        "PT Kereta Api Indonesia (Persero)",
        "PT Krakatau Steel (Persero) Tbk",
        "PT Mineral Industri Indonesia (Persero)",
        "PT Pembangunan Perumahan (Persero) Tbk",
        "PT Perikanan Indonesia",
        "PT Perusahaan Perdagangan Indonesia",
        "PT Rajawali Nusantara Indonesia (Persero)",
        "PT Sang Hyang Seri",
        "PT Timah Tbk",
        "PT Wijaya Karya (Persero) Tbk"
    ],
    kap_djoko_sidik_dan_indra: [
        "PT Pelayaran Nasional Indonesia (Persero)"
    ],
    kap_gani_sidiro_dan_handayani: [
        "PT Dahana",
        "PT Dirgantara Indonesia",
        "PT LEN Industri (Persero)",
        "PT PAL Indonesia",
        "PT Pindad"
    ],
    kap_heliantono_dan_rekan: [
        "PT Biofarma (Persero)",
        "PT Brantas Abipraya (Persero)",
        "PT Indofarma Tbk",
        "PT Kimia Farma Tbk",
        "PT Waskita Karya (Persero) Tbk"
    ],
    kap_kanaka_puradiredja_suhartono: [
        "PT Pos Indonesia (Persero)"
    ],
    kap_lianaxenia_ramon_dan_rekan: [
        "PT Semen Baturaja Tbk",
        "PT Semen Gresik",
        "PT Semen Indonesia (Persero) Tbk",
        "PT Semen Padang",
        "PT Semen Tonasa"
    ],
    kap_paul_hadiwinata_hidajat_arsono_retno_palilingan_dan_rekan: [
        "PT Industri Kereta Api (Persero)",
        "PT Sucofindo",
        "PT Surveyor Indonesia"
    ],
    kap_purwanto_susanti_dan_surja: [
        "PT Angkasa Pura Indonesia",
        "PT Aviasi Pariwisata Indonesia (Persero)",
        "PT Dayamitra Telekomunikasi Tbk",
        "PT Hotel Indonesia Natour",
        "PT Kilang Pertamina Internasional",
        "PT Pelabuhan Indonesia (Persero)",
        "PT Pelindo Jasa Maritim",
        "PT Pelindo Multi Terminal",
        "PT Pelindo Solusi Logistik",
        "PT Pelindo Terminal Petikemas",
        "PT Pengembangan Pariwisata Indonesia",
        "PT Pertamina (Persero)",
        "PT Pertamina Hulu Energi",
        "PT Pertamina Patra Niaga",
        "PT Pertamina Power Indonesia",
        "PT Perusahaan Gas Negara Tbk",
        "PT Sarinah",
        "PT Taman Wisata Candi Borobudur, Prambanan dan Ratu Boko",
        "PT Telkom (Persero), Tbk",
        "PT Telekomunikasi Selular"
    ],
    kap_rintis_jumadi_rianto_dan_rekan: [
        "PT Citilink Indonesia",
        "PT Garuda Indonesia (Persero) Tbk",
        "PT Garuda Maintenance Facility Aero Asia Tbk",
        "PT Hutama Karya (Persero)",
        "PT Perkebunan Nusantara I",
        "PT Perkebunan Nusantara III (Persero)",
        "PT Perkebunan Nusantara IV",
        "PT Perusahaan Listrik Negara (Persero)",
        "PT Petrokimia Gresik",
        "PT PLN Indonesia Power",
        "PT Pupuk Indonesia (Persero)",
        "PT Pupuk Indonesia Niaga",
        "PT Pupuk Indonesia Pangan",
        "PT Pupuk Iskandar Muda",
        "PT Pupuk Kaltim",
        "PT Pupuk Kujang",
        "PT Pupuk Sriwijaya Palembang",
        "PT Rekayasa Industri"
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

