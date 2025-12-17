import { useState } from "react";
import { TableColumn, TableRow as TableRowType } from "@/types/physics";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";

interface Props {
  labId: string;
  columns: TableColumn[];
  calculations: (inputs: Record<string, number>) => Record<string, number>;
}

export const LabTable = ({ columns, calculations }: Props) => {
  const [rows, setRows] = useState<TableRowType[]>([
    { id: "1", values: {} },
  ]);

  const addRow = () => {
    setRows([...rows, { id: String(rows.length + 1), values: {} }]);
  };

  const removeRow = (id: string) => {
    if (rows.length > 1) {
      setRows(rows.filter((row) => row.id !== id).map((row, i) => ({ ...row, id: String(i + 1) })));
    }
  };

  const updateValue = (rowId: string, columnId: string, value: string) => {
    setRows(
      rows.map((row) => {
        if (row.id === rowId) {
          const newValues = { ...row.values, [columnId]: value === "" ? null : parseFloat(value) };
          
          // Calculate derived values
          const inputs: Record<string, number> = {};
          columns.forEach((col) => {
            if (col.isInput && newValues[col.id] !== null) {
              inputs[col.id] = newValues[col.id] as number;
            }
          });

          // Check if all inputs are filled
          const allInputsFilled = columns
            .filter((col) => col.isInput)
            .every((col) => inputs[col.id] !== undefined && !isNaN(inputs[col.id]));

          if (allInputsFilled) {
            const calculated = calculations(inputs);
            Object.entries(calculated).forEach(([key, val]) => {
              newValues[key] = val;
            });
          }

          return { ...row, values: newValues };
        }
        return row;
      })
    );
  };

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full">
          <thead>
            <tr className="bg-secondary/50">
              {columns.map((col) => (
                <th
                  key={col.id}
                  className="px-4 py-3 text-left text-sm font-medium text-foreground border-b border-border"
                >
                  <div>{col.nameUz}</div>
                  {col.unit && (
                    <div className="text-xs text-muted-foreground font-mono mt-0.5">
                      ({col.unit})
                    </div>
                  )}
                </th>
              ))}
              <th className="px-4 py-3 border-b border-border w-12"></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={row.id} className="hover:bg-secondary/30 transition-colors">
                {columns.map((col) => (
                  <td key={col.id} className="px-4 py-2 border-b border-border">
                    {col.id === "n" ? (
                      <span className="text-muted-foreground font-mono">{rowIndex + 1}</span>
                    ) : col.isInput ? (
                      <Input
                        type="number"
                        value={row.values[col.id] ?? ""}
                        onChange={(e) => updateValue(row.id, col.id, e.target.value)}
                        className="w-24 h-8 text-sm font-mono bg-card border-border"
                        placeholder="0"
                        step="any"
                      />
                    ) : (
                      <span className="font-mono text-primary">
                        {row.values[col.id] !== null && row.values[col.id] !== undefined
                          ? row.values[col.id]
                          : "—"}
                      </span>
                    )}
                  </td>
                ))}
                <td className="px-2 py-2 border-b border-border">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeRow(row.id)}
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    disabled={rows.length === 1}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="flex gap-2">
        <Button onClick={addRow} variant="outline" className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Qator qo'shish
        </Button>
      </div>

      {rows.length > 1 && (
        <div className="glass-card p-4 mt-4">
          <h4 className="font-medium mb-2">O'rtacha qiymatlar:</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {columns
              .filter((col) => !col.isInput && col.id !== "n")
              .map((col) => {
                const values = rows
                  .map((r) => r.values[col.id])
                  .filter((v) => v !== null && v !== undefined) as number[];
                const avg = values.length > 0
                  ? values.reduce((a, b) => a + b, 0) / values.length
                  : null;
                
                return (
                  <div key={col.id} className="text-sm">
                    <span className="text-muted-foreground">{col.nameUz}:</span>
                    <span className="ml-2 font-mono text-primary">
                      {avg !== null ? avg.toFixed(2) : "—"} {col.unit}
                    </span>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};
