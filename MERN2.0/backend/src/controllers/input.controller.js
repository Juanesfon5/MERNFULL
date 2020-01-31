const inputCtrl = {};

const Input = require('../models/Input');

inputCtrl.getInputs = async (req,res) => {
    console.log("Getting inputs")
    const inputs = await Input.find();
    res.json(inputs)
};

inputCtrl.createInputs = async (req,res) => {
    const {circuit, value} = req.body;
    const newInput = new Input({
        circuit,
        value
    })
    await newInput.save();
    console.log(newInput);
    res.json({message: 'Input Saved'})
};

inputCtrl.updateInput = async (req,res) =>{
    const { circuit, value} = req.body;
    await Input.findOneAndUpdate({_id :req.params.id}, {
        circuit,
        value
    });
    res.json({message: 'input Updated'});
} 

inputCtrl.deleteInput = async (req,res) =>{
    await Input.findByIdAndDelete(req.params.id);
    res.json({message: 'input Deleted'});

} 


inputCtrl.getInput = async (req,res)=>{
    const input = await Input.findById(req.params.id);
    res.json(input);
}

module.exports = inputCtrl;