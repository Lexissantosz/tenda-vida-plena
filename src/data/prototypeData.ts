import type { CallItem, HouseEvent, PointItem, StudyItem } from '../types/domain'

export const initialCalls: CallItem[] = [
  { id: 1, name: 'Velas brancas', total: 20, remaining: 20, unit: 'unidades', image: '/images/velas.svg', deadline: '2026-10-10' },
  { id: 2, name: 'Café', total: 2, remaining: 2, unit: 'kg', image: '/images/cafe.svg', deadline: '2026-10-10' },
  { id: 3, name: 'Flores brancas', total: 3, remaining: 3, unit: 'buquês', image: '/images/flores.svg', deadline: '2026-10-10' },
]

export const prototypeStudies: StudyItem[] = [
  {
    id: 1,
    title: 'Ervas na Umbanda',
    category: 'Ervas',
    type: 'Material geral',
    progress: 72,
    summary: 'Conteúdo introdutório para organizar o estudo sobre usos e significados.',
    lessons: ['Introdução às ervas', 'Cuidados e preparo', 'Ervas de uso comum', 'Anotações da casa'],
    relatedPointIds: [],
    relatedMaterials: ['Apostila de estudos da casa'],
  },
  {
    id: 2,
    title: 'Linhas de trabalho',
    category: 'Fundamentos',
    type: 'Fundamento da casa',
    progress: 30,
    summary: 'Estrutura que será revisada e preenchida com a orientação da Tenda.',
    lessons: ['Visão geral', 'Organização da casa', 'Material para validação'],
    relatedPointIds: [],
    relatedMaterials: ['Material de apoio para iniciantes'],
  },
  {
    id: 3,
    title: 'História da Umbanda',
    category: 'História',
    type: 'Material geral',
    progress: 10,
    summary: 'Base histórica para leitura e discussão em grupo.',
    lessons: ['Contexto histórico', 'Formação e diversidade', 'Leituras recomendadas'],
    relatedPointIds: [],
    relatedMaterials: ['Apostila de estudos da casa'],
  },
  {
    id: 4,
    title: 'Desenvolvimento mediúnico',
    category: 'Desenvolvimento',
    type: 'Fundamento da casa',
    progress: 0,
    summary: 'Área reservada para material validado pelos responsáveis da casa.',
    lessons: ['Conteúdo a validar', 'Orientações da casa'],
    relatedPointIds: [],
    relatedMaterials: [],
  },
]

const driveSource = 'Documento original da Tenda no Google Drive'

export const prototypePoints: PointItem[] = [
  { id: 1, title: 'Ponto de Baiana', group: 'Baianos', source: driveSource, referenceUrl: 'https://docs.google.com/document/d/1-cMGnC1FEW4qM_al9k6SUHPt_sAnSaqNlGCQ-tbN4O8/edit?usp=drivesdk' },
  { id: 2, title: 'Maria do Balaio', group: 'Baianos', source: driveSource, referenceUrl: 'https://docs.google.com/document/d/1UUC5VhKNJISMqpaUiE6HSbHccRaEeuBW4v78k46gL_w/edit?usp=drivesdk' },
  { id: 3, title: 'Ponto de Baiano', group: 'Baianos', source: driveSource, referenceUrl: 'https://docs.google.com/document/d/1q3-zPp5SFAFSrDSAnYLku8cpd_zSUE4C0xeIP7cpOu0/edit?usp=drivesdk' },
  { id: 4, title: 'Ponto de Baiano', group: 'Baianos', source: driveSource, referenceUrl: 'https://docs.google.com/document/d/1p1z1QOd29vIVaJ74aeRg00INIuxl1NQIw7ytvkNMOaE/edit?usp=drivesdk' },
  { id: 5, title: 'Ponto de Baiano', group: 'Baianos', source: driveSource, referenceUrl: 'https://docs.google.com/document/d/1dKx-zQRMadgjqpM6hL6QoOCUklxZoFoIaQUCC-rm-mI/edit?usp=drivesdk' },
  { id: 6, title: 'Ponto de Baiano', group: 'Baianos', source: driveSource, referenceUrl: 'https://docs.google.com/document/d/1IKyuxDximI4M0ysqk8o6fH2MGoT6AgWYE5NpEoX3DgQ/edit?usp=drivesdk' },
  { id: 7, title: 'Ponto de Baiana', group: 'Baianos', source: driveSource, referenceUrl: 'https://docs.google.com/document/d/1q8OVjtv4tjQg1dWAtG5gYR5bfWKn6N2yR76XiRiW2qY/edit?usp=drivesdk' },
  { id: 8, title: 'Ponto de Baiana', group: 'Baianos', source: driveSource, referenceUrl: 'https://docs.google.com/document/d/1VKRPSMblW4-C9-PTE9nUPV5rXWb8CQZ1_EdYHexhCO0/edit?usp=drivesdk' },
  { id: 9, title: 'Ponto de Baiano', group: 'Baianos', source: driveSource, referenceUrl: 'https://docs.google.com/document/d/1CZ7qcF-XXYYz0JxuttfvLOlOpisNrPGv9syzuXtUaPA/edit?usp=drivesdk' },
  { id: 10, title: 'Ponto de Baianos', group: 'Baianos', source: driveSource, referenceUrl: 'https://docs.google.com/document/d/1yjark_sbNZgwrNk-ITCxk-YY4S85FlyrvZRyZ-q_NX0/edit?usp=drivesdk' },
  { id: 11, title: 'Ponto de Baiana', group: 'Baianos', source: driveSource, referenceUrl: 'https://docs.google.com/document/d/1DjfkgF0U4eMX6PZQ42rgasxHaRJgpFnwLSta_WZREvY/edit?usp=drivesdk' },
  { id: 12, title: 'Ponto de Baiano', group: 'Baianos', source: driveSource, referenceUrl: 'https://docs.google.com/document/d/1b0uCMepEHg6stBYkZ5PfkHyU4pRxki_qdeBbJ1sIDfo/edit?usp=drivesdk' },
  { id: 13, title: 'Ponto de baiano', group: 'Baianos', source: driveSource, referenceUrl: 'https://docs.google.com/document/d/1cams-YPf2wrpnHJ-uomTsL_TKpen0YM3hnouKBXrDt0/edit?usp=drivesdk' },
  { id: 14, title: 'Baiano Zé do coco', group: 'Baianos', source: driveSource, referenceUrl: 'https://docs.google.com/document/d/1o8RMVxTm66OJr2LUPtFjOoAOaV6slcfevl5oxnFt2Xw/edit?usp=drivesdk' },
  { id: 15, title: 'Ponto de Baiano', group: 'Baianos', source: driveSource, referenceUrl: 'https://docs.google.com/document/d/1STwSpz_kUyuuxDS9IxPnYn8DuDN3v1PTGDdsC3QrcCU/edit?usp=drivesdk' },
  { id: 16, title: 'Ponto de Malandro', group: 'Malandragem', source: driveSource, referenceUrl: 'https://docs.google.com/document/d/1ZqopYD0NeXFygSCRTVz2IFaMe7l-Via7Fxm2y_HQ604/edit?usp=drivesdk' },
  { id: 17, title: 'Malandro Miguel', group: 'Malandragem', source: driveSource, referenceUrl: 'https://docs.google.com/document/d/1ehU1dlz5cgt_lihr6mI-laZc1UvwUfCgea7EM64nl60/edit?usp=drivesdk' },
  { id: 18, title: 'Malandro Zé da lapa', group: 'Malandragem', source: driveSource, referenceUrl: 'https://docs.google.com/document/d/1nK_7wbe2gEDIBgAkBpjmtOYNMhStloaVyG2IaaWVnQ4/edit?usp=drivesdk' },
]

export const prototypeEvents: HouseEvent[] = [
  {
    id: 1,
    date: '2026-10-10',
    title: 'Gira de Exu e Pomba Gira',
    time: '18h',
    category: 'Gira',
    note: 'Última gira no local antes de ir pra casa nova.',
    location: 'QNL 3 CJ G Casa 4',
    image: '/images/gira-exu-pombagira-card.jpg',
  },
  { id: 2, date: '2026-10-17', title: 'Desenvolvimento', time: '19h30', category: 'Desenvolvimento', note: 'Exemplo para validação do layout.' },
  { id: 3, date: '2026-10-24', title: 'Organização e limpeza da casa', time: '15h', category: 'Organização', note: 'Exemplo para validação do layout.' },
]
