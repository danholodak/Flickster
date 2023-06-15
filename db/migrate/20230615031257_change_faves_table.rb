class ChangeFavesTable < ActiveRecord::Migration[7.0]
  def change
    rename_table :faves, :favorites
  end
end
