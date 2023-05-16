class CreateTestimonials < ActiveRecord::Migration[7.0]
  def change
    create_table :testimonials do |t|
      t.text :body, null: false
      t.references :author, foreign_key: {to_table: :users}, null: false
      t.references :subject, foreign_key: {to_table: :users}, null: false
      t.timestamps
    end
  end
end
