int MA_LED = 13;
int MA_LED_ROUGE = 12;
int MON_POTAR = A0;

void setup() {
  Serial.begin(9600);
  pinMode(MON_POTAR, INPUT);
  pinMode(MA_LED, OUTPUT);
  pinMode(MA_LED_ROUGE, OUTPUT);
}

void loop() {
  int v = analogRead(MON_POTAR);
  Serial.println(v);
  if(v > 0) {
    digitalWrite(MA_LED_ROUGE, LOW);
    digitalWrite(MA_LED, HIGH);
  } else {
    digitalWrite(MA_LED_ROUGE, HIGH);
    digitalWrite(MA_LED, LOW);
  }
}
