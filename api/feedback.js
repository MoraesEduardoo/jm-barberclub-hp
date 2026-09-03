import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método não permitido' });
    }

    try {
        // Garante que o corpo da requisição seja lido corretamente mesmo se vier como string
        let body = req.body;
        if (typeof body === 'string') {
            try {
                body = JSON.parse(body);
            } catch (e) {
                body = {};
            }
        }

        const visitor_name = body?.visitor_name;
        const message = body?.message;

        if (!message) {
            return res.status(400).json({ error: 'A mensagem é obrigatória.' });
        }

        const supabaseUrl = process.env.SUPABASE_URL;
        const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

        if (!supabaseUrl || !supabaseAnonKey) {
            return res.status(500).json({ error: 'Variáveis de ambiente do Supabase não configuradas.' });
        }

        const supabase = createClient(supabaseUrl, supabaseAnonKey);

        const { data, error } = await supabase
            .from('client_feedbacks')
            .insert([
                {
                    visitor_name: visitor_name || 'Anônimo',
                    message: message
                }
            ]);

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        return res.status(200).json({ success: true, data });

    } catch (err) {
        return res.status(500).json({ error: 'Erro interno no servidor: ' + err.message });
    }
}