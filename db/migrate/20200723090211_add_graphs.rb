class AddGraphs < ActiveRecord::Migration[6.0]
  def change
    add_column :graphs, :distance, :float
  end
end
