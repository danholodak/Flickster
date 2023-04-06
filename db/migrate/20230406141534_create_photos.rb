class CreatePhotos < ActiveRecord::Migration[7.0]
  def change
    create_table :photos do |t|
      t.string :title, null: false
      t.references :users, null: false, foreign_key: true, index: true

      t.timestamps
    end
  end
end
