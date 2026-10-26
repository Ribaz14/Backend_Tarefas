export function naoEncontrado(req, res){
    res.status(404).json({erro: ' Rota não encontrada'});
}

export function tratarErros(err, req, res, next){
    if(err.status){
        return res.status(err.status).json({erro: err.message})
    }
    if(err.name === 'ValidationError'){
        return res.status(400).json({erro: Object.values(err.errors).map(e => e.message)});
    }
    if(err.name === 'CastError'){
        return res.status(400).json({erro: 'ID inválido'});
    }
    console.error(err);
    res.status(500).json({erro: 'Erro interno do servidor'});
}