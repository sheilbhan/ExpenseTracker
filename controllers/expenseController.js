const xlsx  = require('xlsx');
const Expense = require("../models/Expense");


//Add Expense Source 
exports.addExpense = async (req, res) => {
  try {
    const { amount, category, date } = req.body;
    const userId = req.user?.id; // ✅ Ensure this is set

    if (!userId || !amount || !category || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const expense = new Expense({
      userId,
      amount,
      category,
      date,
    });

    await expense.save();
    res.status(201).json(expense);
  } catch (error) {
    console.error("Add Expense Error:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};


//Get All Expense Source 
exports.getAllExpense = async(req , res) => {
    const userId = req.user.id;

    try{
        const expense = await Expense.find({userId}).sort({date : -1});
        res.json(expense);
    }catch(error){
        res.status(500).json({message : "Server Error"});
    }
};

//Delete Expense Source 
exports.deleteExpense = async(req , res) => {
    
    try{
        await Expense.findByIdAndDelete(req.params.id);
        res.json({message : "Expense deleted successfully"});
    }catch(error){
        res.status(500).json({message : "Server Error"});
    }
};

//Download Excel
exports.downloadExpenseExcel = async(req , res) => {
    const userId = req.user.id;

    try{
        const expense = await Expense.find({userId}).sort({date : -1});

        //Prepare data for excel
        const data = expense.map((item) => ({
            category : item.category,
            Amount : item.amount,
            Date : item.date,
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb,ws, "expense");
    xlsx.writeFile(wb, 'expense_details.xlsx');
    res.download('expense_details.xlsx');
   }catch(error){
    res.status(500).json({message : "Server Error"});
  }
};