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

const internalSource = 'Acervo interno da Tenda'

export const prototypePoints: PointItem[] = [
  { id: 1, title: 'Ponto de Baiana', group: 'Baianos', source: internalSource },
  { id: 2, title: 'Maria do Balaio', group: 'Baianos', source: internalSource },
  { id: 3, title: 'Ponto de Baiano', group: 'Baianos', source: internalSource },
  { id: 4, title: 'Ponto de Baiano', group: 'Baianos', source: internalSource },
  { id: 5, title: 'Ponto de Baiano', group: 'Baianos', source: internalSource },
  { id: 6, title: 'Ponto de Baiano', group: 'Baianos', source: internalSource },
  { id: 7, title: 'Ponto de Baiana', group: 'Baianos', source: internalSource },
  { id: 8, title: 'Ponto de Baiana', group: 'Baianos', source: internalSource },
  { id: 9, title: 'Ponto de Baiano', group: 'Baianos', source: internalSource },
  { id: 10, title: 'Ponto de Baianos', group: 'Baianos', source: internalSource },
  { id: 11, title: 'Ponto de Baiana', group: 'Baianos', source: internalSource },
  { id: 12, title: 'Ponto de Baiano', group: 'Baianos', source: internalSource },
  { id: 13, title: 'Ponto de baiano', group: 'Baianos', source: internalSource },
  { id: 14, title: 'Baiano Zé do coco', group: 'Baianos', source: internalSource },
  { id: 15, title: 'Ponto de Baiano', group: 'Baianos', source: internalSource },
  { id: 16, title: 'Ponto de Malandro', group: 'Malandragem', source: internalSource },
  { id: 17, title: 'Malandro Miguel', group: 'Malandragem', source: internalSource },
  { id: 18, title: 'Malandro Zé da lapa', group: 'Malandragem', source: internalSource },
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
    image: '/images/gira-exu-pombogira.png',
  },
  { id: 2, date: '2026-10-17', title: 'Desenvolvimento', time: '19h30', category: 'Desenvolvimento', note: 'Exemplo para validação do layout.' },
  { id: 3, date: '2026-10-24', title: 'Organização e limpeza da casa', time: '15h', category: 'Organização', note: 'Exemplo para validação do layout.' },
]
