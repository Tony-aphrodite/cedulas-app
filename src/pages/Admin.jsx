import { useState } from 'react'
import { banknotes } from '../data/mockData'
import { Banknote, Layers, BarChart3, GitCompare, Users, FileText, Image, Settings } from 'lucide-react'

const navItems = [
  { id: 'banknotes', label: 'Cedulas', icon: Banknote },
  { id: 'varieties', label: 'Variedades', icon: Layers },
  { id: 'grades', label: 'Grades e Valores', icon: BarChart3 },
  { id: 'comparables', label: 'Comparaveis', icon: GitCompare },
  { id: 'population', label: 'Populacao', icon: Users },
  { id: 'observations', label: 'Observacoes', icon: FileText },
  { id: 'images', label: 'Imagens', icon: Image },
  { id: 'settings', label: 'Configuracoes', icon: Settings },
]

export default function Admin() {
  const [activeNav, setActiveNav] = useState('banknotes')
  const [showForm, setShowForm] = useState(false)

  return (
    <div style={{ margin: '-24px -32px', minHeight: 'calc(100vh - 120px)' }}>
      <div className="admin-layout">
        {/* Sidebar */}
        <div className="admin-sidebar">
          <div style={{ padding: '0 20px 20px', borderBottom: '1px solid var(--border-dark)', marginBottom: '10px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--gold-matte)' }}>Painel Admin</h3>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Gestao de Conteudo</p>
          </div>
          {navItems.map(item => {
            const Icon = item.icon
            return (
              <div key={item.id}
                className={`admin-nav-item ${activeNav === item.id ? 'active' : ''}`}
                onClick={() => { setActiveNav(item.id); setShowForm(false) }}
              >
                <Icon size={16} />
                {item.label}
              </div>
            )
          })}
        </div>

        {/* Main Content */}
        <div className="admin-content">
          {activeNav === 'banknotes' && (
            <div>
              <div className="flex items-center justify-between mb-24">
                <div>
                  <h2 className="page-title">Gestao de Cedulas</h2>
                  <p className="page-subtitle" style={{ marginBottom: 0 }}>{banknotes.length} cedulas cadastradas</p>
                </div>
                <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
                  + Nova Cedula
                </button>
              </div>

              {showForm && (
                <div className="card" style={{ marginBottom: '24px' }}>
                  <h3 className="card-title" style={{ marginBottom: '20px' }}>Cadastrar Nova Cedula</h3>
                  <div className="admin-form">
                    <div className="form-row">
                      <div className="form-group">
                        <label>Nome da Cedula</label>
                        <input type="text" placeholder="Ex: 50 Cruzeiros Reais" />
                      </div>
                      <div className="form-group">
                        <label>Pais</label>
                        <select><option>Brasil</option></select>
                      </div>
                      <div className="form-group">
                        <label>Periodo</label>
                        <input type="text" placeholder="Ex: Republica (1993-2005)" />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Emissor</label>
                        <input type="text" placeholder="Ex: Banco Central do Brasil" />
                      </div>
                      <div className="form-group">
                        <label>Pick Number</label>
                        <input type="text" placeholder="Ex: P-241a" />
                      </div>
                      <div className="form-group">
                        <label>Denominacao</label>
                        <input type="number" placeholder="Ex: 50" />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Unidade Monetaria</label>
                        <input type="text" placeholder="Ex: Cruzeiros Reais" />
                      </div>
                      <div className="form-group">
                        <label>Ano</label>
                        <input type="number" placeholder="Ex: 1993" />
                      </div>
                      <div className="form-group">
                        <label>Variedade</label>
                        <input type="text" placeholder="Ex: Estampa A" />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Decreto/Lei</label>
                        <input type="text" placeholder="Ex: DL No. 7.957 de 1993" />
                      </div>
                      <div className="form-group">
                        <label>Fabricante</label>
                        <input type="text" placeholder="Ex: Casa da Moeda do Brasil" />
                      </div>
                      <div className="form-group">
                        <label>Dimensoes</label>
                        <input type="text" placeholder="Ex: 140 x 65 mm" />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Cor Dominante</label>
                        <input type="text" placeholder="Ex: Violeta" />
                      </div>
                      <div className="form-group">
                        <label>Tecnica de Impressao</label>
                        <input type="text" placeholder="Ex: Calcografia e Offset" />
                      </div>
                      <div className="form-group">
                        <label>Tipo</label>
                        <select>
                          <option>Circulacao</option>
                          <option>Specimen</option>
                          <option>Prova</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Assinaturas</label>
                        <input type="text" placeholder="Ex: FHC & Pedro Malan" />
                      </div>
                      <div className="form-group">
                        <label>Marca d'Agua</label>
                        <input type="text" placeholder="Ex: Tiradentes" />
                      </div>
                      <div className="form-group">
                        <label>Fio de Seguranca</label>
                        <select><option>Sim</option><option>Nao</option></select>
                      </div>
                    </div>
                    <div className="form-row" style={{ gridTemplateColumns: '1fr 1fr' }}>
                      <div className="form-group">
                        <label>Descricao Anverso</label>
                        <textarea placeholder="Descricao do anverso da cedula..."></textarea>
                      </div>
                      <div className="form-group">
                        <label>Descricao Reverso</label>
                        <textarea placeholder="Descricao do reverso da cedula..."></textarea>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Observacoes Editoriais</label>
                      <textarea placeholder="Comentario tecnico sobre a cedula..." style={{ minHeight: '120px' }}></textarea>
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <button className="btn btn-primary">Salvar Cedula</button>
                      <button className="btn btn-secondary" onClick={() => setShowForm(false)}>Cancelar</button>
                    </div>
                  </div>
                </div>
              )}

              {/* Banknotes List */}
              <div className="card">
                <table className="premium-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nome</th>
                      <th>Pick</th>
                      <th>Ano</th>
                      <th>Preco Guia</th>
                      <th>Populacao</th>
                      <th>Imagem</th>
                      <th>Acoes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {banknotes.map(b => (
                      <tr key={b.id}>
                        <td>#{b.id}</td>
                        <td style={{ fontWeight: 600 }}>{b.name}</td>
                        <td>{b.pickNumber}</td>
                        <td>{b.year}</td>
                        <td style={{ fontWeight: 700, color: 'var(--gold-matte)' }}>R$ {b.guidePrice.toLocaleString('pt-BR')}</td>
                        <td>{b.populationTotal}</td>
                        <td>
                          {b.hasImage
                            ? <span className="badge badge-observado">Sim</span>
                            : <span className="badge badge-indicativo">Nao</span>
                          }
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button className="btn btn-secondary" style={{ padding: '4px 12px', fontSize: '11px' }}>Editar</button>
                            <button className="btn btn-secondary" style={{ padding: '4px 12px', fontSize: '11px', color: 'var(--red-controlled)' }}>Remover</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeNav === 'grades' && (
            <div>
              <h2 className="page-title">Gestao de Grades e Valores</h2>
              <p className="page-subtitle">Cadastrar e atualizar valores por grade para cada cedula</p>
              <div className="card" style={{ marginBottom: '24px' }}>
                <h3 className="card-title" style={{ marginBottom: '20px' }}>Cadastrar Valor por Grade</h3>
                <div className="admin-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Cedula</label>
                      <select>
                        {banknotes.map(b => <option key={b.id}>{b.name} ({b.pickNumber})</option>)}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Grade (PMG)</label>
                      <select>
                        {[64,65,66,67,68,69,70].map(g => <option key={g}>{g}</option>)}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>EPQ</label>
                      <select><option>Sim</option><option>Nao</option></select>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Valor Guia (R$)</label>
                      <input type="number" placeholder="Ex: 13000" />
                    </div>
                    <div className="form-group">
                      <label>Faixa Minima (R$)</label>
                      <input type="number" placeholder="Ex: 12000" />
                    </div>
                    <div className="form-group">
                      <label>Faixa Maxima (R$)</label>
                      <input type="number" placeholder="Ex: 14000" />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Populacao</label>
                      <input type="number" placeholder="Ex: 28" />
                    </div>
                    <div className="form-group">
                      <label>Status Metodologico</label>
                      <select>
                        <option>Observado</option>
                        <option>Estimado</option>
                        <option>Indicativo</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Confianca (1-5)</label>
                      <select>{[1,2,3,4,5].map(c => <option key={c}>{c}</option>)}</select>
                    </div>
                  </div>
                  <button className="btn btn-primary">Salvar Grade</button>
                </div>
              </div>
            </div>
          )}

          {activeNav === 'comparables' && (
            <div>
              <h2 className="page-title">Gestao de Comparaveis</h2>
              <p className="page-subtitle">Cadastrar transacoes e vendas comparaveis</p>
              <div className="card">
                <h3 className="card-title" style={{ marginBottom: '20px' }}>Cadastrar Comparavel</h3>
                <div className="admin-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Cedula</label>
                      <select>
                        {banknotes.map(b => <option key={b.id}>{b.name} ({b.pickNumber})</option>)}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Data da Venda</label>
                      <input type="date" />
                    </div>
                    <div className="form-group">
                      <label>Certificadora</label>
                      <select><option>PMG</option><option>PCGS</option></select>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Grade</label>
                      <select>{[64,65,66,67,68,69,70].map(g => <option key={g}>{g}</option>)}</select>
                    </div>
                    <div className="form-group">
                      <label>EPQ</label>
                      <select><option>Sim</option><option>Nao</option></select>
                    </div>
                    <div className="form-group">
                      <label>Serial</label>
                      <input type="text" placeholder="Ex: 1234567" />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Leilao/Marketplace</label>
                      <input type="text" placeholder="Ex: Heritage Auctions" />
                    </div>
                    <div className="form-group">
                      <label>Preco Realizado</label>
                      <input type="number" placeholder="Ex: 13900" />
                    </div>
                    <div className="form-group">
                      <label>Moeda</label>
                      <select><option>BRL</option><option>USD</option><option>EUR</option></select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Observacoes</label>
                    <textarea placeholder="Observacoes sobre a transacao..."></textarea>
                  </div>
                  <button className="btn btn-primary">Salvar Comparavel</button>
                </div>
              </div>
            </div>
          )}

          {activeNav === 'population' && (
            <div>
              <h2 className="page-title">Gestao de Populacao</h2>
              <p className="page-subtitle">Cadastrar e atualizar dados de populacao certificada</p>
              <div className="card">
                <h3 className="card-title" style={{ marginBottom: '20px' }}>Cadastrar Populacao</h3>
                <div className="admin-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Cedula</label>
                      <select>
                        {banknotes.map(b => <option key={b.id}>{b.name} ({b.pickNumber})</option>)}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Total Certificado</label>
                      <input type="number" placeholder="Ex: 89" />
                    </div>
                    <div className="form-group">
                      <label>Total EPQ</label>
                      <input type="number" placeholder="Ex: 48" />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Maior Grade Conhecido</label>
                      <input type="text" placeholder="Ex: PMG 68 EPQ" />
                    </div>
                    <div className="form-group">
                      <label>Raridade Estimada</label>
                      <select>
                        <option>Common</option>
                        <option>Scarce</option>
                        <option>Rare</option>
                        <option>Very Rare</option>
                        <option>Extremely Rare</option>
                        <option>Finest Known</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Score de Raridade (1-10)</label>
                      <input type="number" min="1" max="10" placeholder="Ex: 8" />
                    </div>
                  </div>
                  <button className="btn btn-primary">Salvar Populacao</button>
                </div>
              </div>
            </div>
          )}

          {activeNav === 'images' && (
            <div>
              <h2 className="page-title">Gestao de Imagens</h2>
              <p className="page-subtitle">Upload e gestao de imagens das cedulas</p>
              <div className="card">
                <h3 className="card-title" style={{ marginBottom: '20px' }}>Upload de Imagem</h3>
                <div className="admin-form">
                  <div className="form-row" style={{ gridTemplateColumns: '1fr 1fr' }}>
                    <div className="form-group">
                      <label>Cedula</label>
                      <select>
                        {banknotes.map(b => <option key={b.id}>{b.name} ({b.pickNumber})</option>)}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Tipo de Imagem</label>
                      <select>
                        <option>Anverso (Frente)</option>
                        <option>Reverso (Verso)</option>
                        <option>Slab Completo</option>
                        <option>Detalhe</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Arquivo de Imagem</label>
                    <div style={{
                      border: '2px dashed var(--border-dark)',
                      borderRadius: 'var(--radius-lg)',
                      padding: '40px',
                      textAlign: 'center',
                      color: 'var(--text-muted)',
                      cursor: 'pointer',
                      transition: 'border-color 0.2s'
                    }}>
                      <Image size={40} style={{ marginBottom: '12px', opacity: 0.5 }} />
                      <p style={{ fontSize: '13px' }}>Arraste uma imagem ou clique para selecionar</p>
                      <p style={{ fontSize: '11px', marginTop: '4px' }}>PNG, JPG ate 10MB. Recomendado: 1200x600px</p>
                    </div>
                  </div>
                  <button className="btn btn-primary">Upload Imagem</button>
                </div>
              </div>
            </div>
          )}

          {activeNav === 'varieties' && (
            <div>
              <h2 className="page-title">Gestao de Variedades</h2>
              <p className="page-subtitle">Cadastrar variedades e subtipos de cedulas</p>
              <div className="card">
                <h3 className="card-title" style={{ marginBottom: '20px' }}>Cadastrar Variedade</h3>
                <div className="admin-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Cedula Base</label>
                      <select>
                        {banknotes.map(b => <option key={b.id}>{b.name} ({b.pickNumber})</option>)}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Nome da Variedade</label>
                      <input type="text" placeholder="Ex: Estampa A - Numeracao de 6 digitos" />
                    </div>
                    <div className="form-group">
                      <label>Subtipo</label>
                      <input type="text" placeholder="Ex: Serie Inicial" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Descricao da Variedade</label>
                    <textarea placeholder="Descricao detalhada da variedade..."></textarea>
                  </div>
                  <button className="btn btn-primary">Salvar Variedade</button>
                </div>
              </div>
            </div>
          )}

          {activeNav === 'observations' && (
            <div>
              <h2 className="page-title">Observacoes Editoriais</h2>
              <p className="page-subtitle">Inserir e editar comentarios tecnicos</p>
              <div className="card">
                <h3 className="card-title" style={{ marginBottom: '20px' }}>Cadastrar Observacao</h3>
                <div className="admin-form">
                  <div className="form-row" style={{ gridTemplateColumns: '1fr 1fr' }}>
                    <div className="form-group">
                      <label>Cedula</label>
                      <select>
                        {banknotes.map(b => <option key={b.id}>{b.name} ({b.pickNumber})</option>)}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Autor</label>
                      <input type="text" placeholder="Ex: Dr. Eduardo Moraes" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Comentario Tecnico / Editorial</label>
                    <textarea style={{ minHeight: '200px' }} placeholder="Digite o comentario tecnico sobre a cedula. Este texto sera exibido na pagina da cedula como 'Comentario Tecnico' com formatacao editorial..."></textarea>
                  </div>
                  <button className="btn btn-primary">Salvar Observacao</button>
                </div>
              </div>
            </div>
          )}

          {activeNav === 'settings' && (
            <div>
              <h2 className="page-title">Configuracoes</h2>
              <p className="page-subtitle">Configuracoes gerais do sistema</p>
              <div className="card">
                <div className="admin-form">
                  <div className="form-row" style={{ gridTemplateColumns: '1fr 1fr' }}>
                    <div className="form-group">
                      <label>Nome da Plataforma</label>
                      <input type="text" defaultValue="Numisma Brazil" />
                    </div>
                    <div className="form-group">
                      <label>Moeda Padrao</label>
                      <select><option>BRL - Real Brasileiro</option><option>USD - Dolar</option></select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Descricao</label>
                    <textarea defaultValue="Plataforma premium de catalogo e valuation de cedulas graduadas"></textarea>
                  </div>
                  <button className="btn btn-primary">Salvar Configuracoes</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
