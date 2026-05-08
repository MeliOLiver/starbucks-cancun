import React from "react";

export default function App() {
  const [screen, setScreen] = React.useState("home");

  const [pickupName, setPickupName] = React.useState("");
  const [comboType, setComboType] = React.useState("");
  const [size, setSize] = React.useState(null);
  const [food, setFood] = React.useState("");
  const [drink, setDrink] = React.useState("");
  const [milkType, setMilkType] = React.useState("");
  const [drinkTemperature, setDrinkTemperature] = React.useState("");
  const [comments, setComments] = React.useState("");
  const [chipotle, setChipotle] = React.useState("");

  const phone = "529982271559";

  const milkOptions = [
    { name: "Entera", extra: 0 },
    { name: "Light", extra: 0 },
    { name: "Deslactosada", extra: 12 },
    { name: "Avena", extra: 15 },
    { name: "Soya", extra: 14 },
    { name: "Almendra", extra: 14 },
    { name: "Coco", extra: 14 },
    { name: "Breve", extra: 14 },
  ];

  const comboData = {
    salado: {
      title: "Combo Salado",
      sizes: [
        { name: "Alto", price: 145 },
        { name: "Grande", price: 155 },
        { name: "Venti", price: 160 },
      ],
      foods: [
        {
          name: "Baguette Española",
          image:
            "https://djftrby1k8irl.cloudfront.net/s3fs-public/2022-02%2FBaguette%20Espan%CC%83ola_1.png?auto=format,compress&q=70&crop=focalpoint&ar=1:1.0&w=180&fit=crop&dpr=2",
        },
        {
          name: "Baguette Clásica",
          image:
            "https://djftrby1k8irl.cloudfront.net/s3fs-public/2022-02%2FBaguette%20Clasico_1.png?auto=format,compress&q=70&crop=focalpoint&ar=1:1.0&w=180&fit=crop&dpr=2",
        },
        {
          name: "Croissant Jamón y Queso",
          image:
            "https://djftrby1k8irl.cloudfront.net/s3fs-public/2022-02%2FCrossaint%20de%20Mantequilla%20con%20pechuga%20de%20pavo%20y%20queso_1.png?auto=format,compress&q=70&crop=focalpoint&ar=1:1.0&w=180&fit=crop&dpr=2",
        },
      ],
    },
    dulce: {
      title: "Combo Dulce",
      sizes: [
        { name: "Alto", price: 109 },
        { name: "Grande", price: 119 },
        { name: "Venti", price: 124 },
      ],
      foods: [
        {
          name: "Pan de Chocolate",
          image:
            "https://djftrby1k8irl.cloudfront.net/s3fs-public/2022-02%2FPan%20de%20Chocolate_1.png?auto=format,compress&q=70&crop=focalpoint&ar=1:1.0&w=180&fit=crop&dpr=2",
        },
        {
          name: "Croissant de Mantequilla",
          image:
            "https://djftrby1k8irl.cloudfront.net/s3fs-public/2024-01%2FCroissant-mantequilla.png?auto=format,compress&q=70&crop=focalpoint&ar=1:1.0&w=180&fit=crop&dpr=2",
        },
      ],
    },
  };

  const drinks = [
    {
      name: "Latte",
      image:
        "https://djftrby1k8irl.cloudfront.net/s3fs-public/2022-02%2Flatte_1.png?auto=format,compress&q=70&crop=focalpoint&ar=1:1.0&w=180&fit=crop&dpr=2",
    },
    {
      name: "Chai",
      image:
        "https://djftrby1k8irl.cloudfront.net/s3fs-public/2022-02%2Fcappuccino_1.png?auto=format,compress&q=70&crop=focalpoint&ar=1:1.0&w=180&fit=crop&dpr=2",
    },
    {
      name: "Americano",
      image:
        "https://djftrby1k8irl.cloudfront.net/s3fs-public/2022-02%2Fespresso-americano_1.png?auto=format,compress&q=70&crop=focalpoint&ar=1:1.0&w=180&fit=crop&dpr=2",
    },
    {
      name: "Strawberry Açaí",
      image:
        "https://djftrby1k8irl.cloudfront.net/s3fs-public/2022-02%2Fstrawberry-acai-refresher_0_1.png?auto=format,compress&q=70&crop=focalpoint&ar=1:1.0&w=180&fit=crop&dpr=2",
    },
  ];

  const currentCombo = comboData[comboType];

  const total = React.useMemo(() => {
    if (!size) return 0;
    let base = size.price;
    if ((drink === "Latte" || drink === "Chai") && milkType) {
      const milk = milkOptions.find((m) => m.name === milkType);
      base += milk ? milk.extra : 0;
    }
    return base;
  }, [size, drink, milkType]);

  const sendOrder = () => {
    if (!pickupName || !comboType || !size || !food || !drink) {
      alert("Completa todos los campos");
      return;
    }

    if (comboType === "salado" && !chipotle) {
      alert("Selecciona con o sin blister de chipotle");
      return;
    }

    let drinkText = drink;

    if (drink === "Latte" || drink === "Chai") {
      if (!drinkTemperature) {
        alert("Selecciona frío o caliente");
        return;
      }
      if (!milkType) {
        alert("Selecciona tipo de leche");
        return;
      }
      const milkSelected = milkOptions.find((m) => m.name === milkType);
      drinkText = `${drink} ${drinkTemperature} - Leche ${milkType}${
        milkSelected.extra > 0 ? ` (+$${milkSelected.extra})` : ""
      }`;
    }

    if (drink === "Americano") {
      drinkText = "Americano Frío";
    }

    let foodText = food;
    if (comboType === "salado") {
      foodText = `${food} (${chipotle})`;
    }

    const message = `Hola, soy ${pickupName} quiero pedir:

📦 ${currentCombo.title}

☕ Tamaño: ${size.name}

🥐 Alimento: ${foodText}

🥤 Bebida: ${drinkText}

📝 Comentarios: ${comments || "Ninguno"}

💲 Total: $${total}`;

    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  const colors = {
    green: "#006241",
    greenDark: "#004d33",
    greenLight: "#d4e9e2",
    cream: "#f7f1e4",
    white: "#ffffff",
    black: "#1e3932",
    gray: "#6b6b6b",
    gold: "#cba258",
    red: "#d32f2f",
    whatsapp: "#25D366",
  };

  const cardStyle = {
    background: colors.white,
    borderRadius: "20px",
    padding: "25px",
    boxShadow: "0 6px 20px rgba(0, 98, 65, 0.12)",
    border: `1px solid ${colors.greenLight}`,
  };

  // ⚠️ CAMBIA ESTO por el nombre de tu imagen
  const cuponImage = "/cupon-20.png"; // <-- PON EL NOMBRE EXACTO DE TU IMAGEN

  return (
    <div
      style={{
        minHeight: "100vh",
        background: `linear-gradient(180deg, ${colors.cream} 0%, ${colors.white} 100%)`,
        fontFamily: '"SoDo Sans", "Helvetica Neue", Helvetica, Arial, sans-serif',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        * {
          font-family: 'SoDo Sans', 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif;
        }
      `}</style>

      {/* HEADER */}
      <div
        style={{
          background: `linear-gradient(135deg, ${colors.green} 0%, ${colors.greenDark} 100%)`,
          color: colors.white,
          padding: "35px 20px",
          textAlign: "center",
          borderBottomLeftRadius: "30px",
          borderBottomRightRadius: "30px",
          boxShadow: "0 4px 20px rgba(0, 98, 65, 0.3)",
        }}
      >
        <h1 style={{ 
          margin: 0, 
          fontWeight: "800", 
          letterSpacing: "2px",
          textTransform: "uppercase",
          fontSize: "clamp(20px, 4vw, 28px)"
        }}>
          ✦ Starbucks Aeropuerto Cancún T3 ✦
        </h1>
      </div>

      {/* HOME */}
      {screen === "home" && (
        <div style={{ maxWidth: "700px", margin: "30px auto", padding: "20px" }}>
          <div style={cardStyle}>
            <h2 style={{ 
              color: colors.black, 
              fontWeight: "700",
              letterSpacing: "1px" 
            }}>
              Selecciona una opción
            </h2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "15px",
                marginTop: "25px",
              }}
            >
              {/* BOTÓN DESCUENTO 20% */}
              <button
                onClick={() => setScreen("descuento")}
                style={{
                  padding: "20px",
                  borderRadius: "15px",
                  border: `2px solid ${colors.gold}`,
                  background: `linear-gradient(135deg, ${colors.green} 0%, ${colors.greenDark} 100%)`,
                  color: colors.white,
                  fontWeight: "700",
                  fontSize: "18px",
                  cursor: "pointer",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => e.target.style.transform = "scale(1.02)"}
                onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
              >
                ✦ Descuento 20%
              </button>

              {/* BOTÓN COMBO LOCATARIO */}
              <button
                onClick={() => setScreen("combo")}
                style={{
                  padding: "20px",
                  borderRadius: "15px",
                  border: "none",
                  background: `linear-gradient(135deg, ${colors.green} 0%, ${colors.greenDark} 100%)`,
                  color: colors.white,
                  fontWeight: "700",
                  fontSize: "18px",
                  cursor: "pointer",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => e.target.style.transform = "scale(1.02)"}
                onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
              >
                Combo Locatario
              </button>
            </div>

            <div
              style={{
                marginTop: "30px",
                background: colors.greenLight,
                padding: "20px",
                borderRadius: "15px",
                border: `1px solid ${colors.green}`,
              }}
            >
              <h3 style={{ 
                color: colors.green, 
                fontWeight: "700",
                letterSpacing: "1px",
                textTransform: "uppercase",
                fontSize: "16px"
              }}>
                Términos y condiciones
              </h3>
              <ul style={{ 
                lineHeight: "2", 
                color: colors.black,
                fontWeight: "500"
              }}>
                <li>Traer puesta tu TIA</li>
                <li>Mandar el pedido 10 min antes de venir por él</li>
                <li>Únicamente pago con tarjeta</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* PANTALLA DESCUENTO 20% */}
      {screen === "descuento" && (
        <div style={{ maxWidth: "700px", margin: "30px auto", padding: "20px" }}>
          <div style={cardStyle}>
            <h2 style={{ 
              color: colors.green, 
              fontWeight: "800",
              letterSpacing: "2px",
              textTransform: "uppercase",
              fontSize: "24px",
              textAlign: "center",
              marginBottom: "20px"
            }}>
              ✦ 20% de Descuento ✦
            </h2>

            {/* IMAGEN DEL CUPÓN */}
            <div style={{
              textAlign: "center",
              marginBottom: "25px",
              padding: "20px",
              background: colors.cream,
              borderRadius: "15px",
            }}>
              <img 
                src={cuponImage} 
                alt="Cupón 20% descuento"
                style={{
                  maxWidth: "100%",
                  maxHeight: "300px",
                  objectFit: "contain",
                  borderRadius: "10px",
                }}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = `
                    <div style="padding: 40px; background: #f0f0f0; border-radius: 10px; border: 2px dashed #999;">
                      <p style="color: #666;">🖼️ Imagen no encontrada</p>
                      <p style="color: #999; font-size: 14px;">Sube tu imagen a la carpeta "public" en GitHub</p>
                    </div>
                  `;
                }}
              />
            </div>

            {/* INSTRUCCIONES */}
            <div style={{
              background: colors.greenLight,
              padding: "25px",
              borderRadius: "15px",
              border: `2px solid ${colors.green}`,
              marginBottom: "20px",
            }}>
              <p style={{
                color: colors.black,
                fontSize: "16px",
                fontWeight: "500",
                lineHeight: "1.8",
                textAlign: "center",
                marginBottom: "20px",
              }}>
                En la compra de alimentos o bebidas, presenta el siguiente cupón junto a tu TIA y obtén el <strong style={{ color: colors.green }}>20% de descuento</strong>:
              </p>

              {/* CÓDIGO DEL CUPÓN */}
              <div style={{
                background: colors.white,
                border: `3px dashed ${colors.gold}`,
                borderRadius: "12px",
                padding: "20px",
                textAlign: "center",
                marginTop: "15px",
              }}>
                <p style={{
                  fontSize: "14px",
                  color: colors.gray,
                  marginBottom: "8px",
                  fontWeight: "600",
                  letterSpacing: "1px",
                }}>
                  CÓDIGO DE CUPÓN
                </p>
                <p style={{
                  fontSize: "32px",
                  fontWeight: "800",
                  color: colors.green,
                  letterSpacing: "4px",
                  margin: "0",
                  fontFamily: "monospace",
                }}>
                  2ZQCNPP7
                </p>
              </div>
            </div>

            {/* BOTÓN VOLVER */}
            <button
              onClick={() => setScreen("home")}
              style={{
                width: "100%",
                padding: "15px",
                borderRadius: "12px",
                border: `2px solid ${colors.green}`,
                background: colors.white,
                color: colors.green,
                fontWeight: "700",
                fontSize: "16px",
                cursor: "pointer",
                letterSpacing: "1px",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = colors.green;
                e.target.style.color = colors.white;
              }}
              onMouseLeave={(e) => {
                e.target.style.background = colors.white;
                e.target.style.color = colors.green;
              }}
            >
              ← Volver al inicio
            </button>
          </div>
        </div>
      )}

      {/* COMBO */}
      {screen === "combo" && (
        <div style={{ maxWidth: "1100px", margin: "30px auto", padding: "20px" }}>
          <div style={cardStyle}>
            <h2 style={{ 
              color: colors.black, 
              fontWeight: "700",
              letterSpacing: "1px",
              textTransform: "uppercase" 
            }}>
              ✦ Combo Locatario ✦
            </h2>

            <input
              type="text"
              placeholder="Nombre de quien recoge"
              value={pickupName}
              onChange={(e) => setPickupName(e.target.value)}
              style={{
                width: "100%",
                padding: "15px",
                borderRadius: "12px",
                border: `2px solid ${colors.green}`,
                marginTop: "20px",
                color: colors.black,
                fontWeight: "500",
                fontSize: "16px",
                background: colors.cream,
              }}
            />

            <div
              style={{
                display: "flex",
                gap: "15px",
                marginTop: "20px",
                flexWrap: "wrap",
              }}
            >
              <button
                onClick={() => {
                  setComboType("salado");
                  setFood("");
                  setChipotle("");
                }}
                style={{
                  padding: "15px 25px",
                  borderRadius: "12px",
                  border: "none",
                  background: comboType === "salado" ? colors.green : colors.greenLight,
                  color: comboType === "salado" ? colors.white : colors.green,
                  fontWeight: "700",
                  cursor: "pointer",
                  fontSize: "16px",
                  letterSpacing: "1px",
                  transition: "all 0.3s ease",
                }}
              >
                🥐 Combo Salado
              </button>

              <button
                onClick={() => {
                  setComboType("dulce");
                  setFood("");
                  setChipotle("");
                }}
                style={{
                  padding: "15px 25px",
                  borderRadius: "12px",
                  border: "none",
                  background: comboType === "dulce" ? colors.green : colors.greenLight,
                  color: comboType === "dulce" ? colors.white : colors.green,
                  fontWeight: "700",
                  cursor: "pointer",
                  fontSize: "16px",
                  letterSpacing: "1px",
                  transition: "all 0.3s ease",
                }}
              >
                🍫 Combo Dulce
              </button>
            </div>
          </div>

          {comboType && (
            <>
              {/* TAMAÑOS */}
              <div style={{ ...cardStyle, marginTop: "25px" }}>
                <h2 style={{ 
                  color: colors.black, 
                  fontWeight: "700",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  fontSize: "20px"
                }}>
                  Selecciona tamaño
                </h2>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                    gap: "15px",
                    marginTop: "20px",
                  }}
                >
                  {currentCombo.sizes.map((item) => (
                    <div
                      key={item.name}
                      onClick={() => setSize(item)}
                      style={{
                        background: size?.name === item.name 
                          ? `linear-gradient(135deg, ${colors.green} 0%, ${colors.greenDark} 100%)` 
                          : colors.white,
                        color: size?.name === item.name ? colors.white : colors.black,
                        borderRadius: "18px",
                        padding: "25px 20px",
                        cursor: "pointer",
                        border: size?.name === item.name 
                          ? "none" 
                          : `2px solid ${colors.green}`,
                        textAlign: "center",
                        fontWeight: "700",
                        transition: "all 0.3s ease",
                      }}
                    >
                      <h3 style={{ 
                        fontSize: "22px", 
                        letterSpacing: "2px",
                        textTransform: "uppercase",
                        marginBottom: "8px"
                      }}>
                        {item.name}
                      </h3>
                      <p style={{ fontSize: "18px" }}>${item.price}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* ALIMENTOS */}
              <div style={{ ...cardStyle, marginTop: "25px" }}>
                <h2 style={{ 
                  color: colors.black, 
                  fontWeight: "700",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  fontSize: "20px"
                }}>
                  Selecciona alimento
                </h2>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                    gap: "20px",
                    marginTop: "20px",
                  }}
                >
                  {currentCombo.foods.map((item) => (
                    <div
                      key={item.name}
                      onClick={() => setFood(item.name)}
                      style={{
                        background: food === item.name ? colors.greenLight : colors.white,
                        border:
                          food === item.name
                            ? `3px solid ${colors.green}`
                            : `2px solid ${colors.greenLight}`,
                        borderRadius: "20px",
                        overflow: "hidden",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                      }}
                    >
                      <div style={{
                        width: "100%",
                        height: "200px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: colors.white,
                        padding: "20px",
                      }}>
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{
                            maxWidth: "100%",
                            maxHeight: "100%",
                            objectFit: "contain",
                          }}
                        />
                      </div>
                      <div style={{ 
                        padding: "18px", 
                        background: food === item.name ? colors.greenLight : colors.white,
                        textAlign: "center"
                      }}>
                        <h3 style={{ 
                          color: colors.black, 
                          fontWeight: "600",
                          fontSize: "16px"
                        }}>
                          {item.name}
                        </h3>
                      </div>
                    </div>
                  ))}
                </div>

                {/* BLISTER DE CHIPOTLE */}
                {comboType === "salado" && food && (
                  <div style={{ marginTop: "25px" }}>
                    <h3 style={{ 
                      color: colors.black, 
                      fontWeight: "700",
                      letterSpacing: "1px"
                    }}>
                      🌶️ Blister de Chipotle
                    </h3>
                    <div style={{ display: "flex", gap: "12px", marginTop: "12px" }}>
                      <button
                        onClick={() => setChipotle("Con blister de chipotle")}
                        style={{
                          padding: "14px 24px",
                          borderRadius: "12px",
                          border: "none",
                          background:
                            chipotle === "Con blister de chipotle" 
                              ? `linear-gradient(135deg, ${colors.green} 0%, ${colors.greenDark} 100%)` 
                              : colors.greenLight,
                          color: chipotle === "Con blister de chipotle" ? colors.white : colors.green,
                          fontWeight: "700",
                          cursor: "pointer",
                          letterSpacing: "1px",
                          transition: "all 0.3s ease",
                        }}
                      >
                        🌶️ Con Chipotle
                      </button>
                      <button
                        onClick={() => setChipotle("Sin blister de chipotle")}
                        style={{
                          padding: "14px 24px",
                          borderRadius: "12px",
                          border: "none",
                          background:
                            chipotle === "Sin blister de chipotle" 
                              ? `linear-gradient(135deg, ${colors.green} 0%, ${colors.greenDark} 100%)` 
                              : colors.greenLight,
                          color: chipotle === "Sin blister de chipotle" ? colors.white : colors.green,
                          fontWeight: "700",
                          cursor: "pointer",
                          letterSpacing: "1px",
                          transition: "all 0.3s ease",
                        }}
                      >
                        ❌ Sin Chipotle
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* BEBIDAS */}
              <div style={{ ...cardStyle, marginTop: "25px" }}>
                <h2 style={{ 
                  color: colors.black, 
                  fontWeight: "700",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  fontSize: "20px"
                }}>
                  Selecciona bebida
                </h2>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                    gap: "20px",
                    marginTop: "20px",
                  }}
                >
                  {drinks.map((item) => (
                    <div
                      key={item.name}
                      onClick={() => {
                        setDrink(item.name);
                        setMilkType("");
                        setDrinkTemperature("");
                      }}
                      style={{
                        background: drink === item.name ? colors.greenLight : colors.white,
                        border:
                          drink === item.name
                            ? `3px solid ${colors.green}`
                            : `2px solid ${colors.greenLight}`,
                        borderRadius: "20px",
                        overflow: "hidden",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                      }}
                    >
                      <div style={{
                        width: "100%",
                        height: "200px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: colors.white,
                        padding: "20px",
                      }}>
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{
                            maxWidth: "100%",
                            maxHeight: "100%",
                            objectFit: "contain",
                          }}
                        />
                      </div>
                      <div style={{ 
                        padding: "18px", 
                        background: drink === item.name ? colors.greenLight : colors.white,
                        textAlign: "center"
                      }}>
                        <h3 style={{ 
                          color: colors.black, 
                          fontWeight: "600",
                          fontSize: "16px"
                        }}>
                          {item.name}
                        </h3>
                      </div>
                    </div>
                  ))}
                </div>

                {(drink === "Latte" || drink === "Chai") && (
                  <>
                    <div style={{ marginTop: "25px" }}>
                      <h3 style={{ 
                        color: colors.black, 
                        fontWeight: "700",
                        letterSpacing: "1px"
                      }}>
                        Frío o caliente
                      </h3>
                      <div style={{ display: "flex", gap: "12px", marginTop: "12px" }}>
                        <button
                          onClick={() => setDrinkTemperature("Frío")}
                          style={{
                            padding: "14px 24px",
                            borderRadius: "12px",
                            border: "none",
                            background:
                              drinkTemperature === "Frío" 
                                ? `linear-gradient(135deg, ${colors.green} 0%, ${colors.greenDark} 100%)` 
                                : colors.greenLight,
                            color: drinkTemperature === "Frío" ? colors.white : colors.green,
                            fontWeight: "700",
                            cursor: "pointer",
                            letterSpacing: "1px",
                            transition: "all 0.3s ease",
                          }}
                        >
                          ❄️ Frío
                        </button>
                        <button
                          onClick={() => setDrinkTemperature("Caliente")}
                          style={{
                            padding: "14px 24px",
                            borderRadius: "12px",
                            border: "none",
                            background:
                              drinkTemperature === "Caliente" 
                                ? `linear-gradient(135deg, ${colors.green} 0%, ${colors.greenDark} 100%)` 
                                : colors.greenLight,
                            color: drinkTemperature === "Caliente" ? colors.white : colors.green,
                            fontWeight: "700",
                            cursor: "pointer",
                            letterSpacing: "1px",
                            transition: "all 0.3s ease",
                          }}
                        >
                          ☕ Caliente
                        </button>
                      </div>
                    </div>

                    <div style={{ marginTop: "25px" }}>
                      <h3 style={{ 
                        color: colors.black, 
                        fontWeight: "700",
                        letterSpacing: "1px"
                      }}>
                        Tipo de leche
                      </h3>
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "12px",
                          marginTop: "15px",
                        }}
                      >
                        {milkOptions.map((milk) => (
                          <button
                            key={milk.name}
                            onClick={() => setMilkType(milk.name)}
                            style={{
                              padding: "12px 20px",
                              borderRadius: "12px",
                              border: "none",
                              background:
                                milkType === milk.name 
                                  ? `linear-gradient(135deg, ${colors.green} 0%, ${colors.greenDark} 100%)` 
                                  : colors.greenLight,
                              color: milkType === milk.name ? colors.white : colors.green,
                              fontWeight: "600",
                              cursor: "pointer",
                              transition: "all 0.3s ease",
                              fontSize: "15px",
                            }}
                          >
                            {milk.name}
                            {milk.extra > 0 ? ` +$${milk.extra}` : ""}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* RESUMEN */}
              <div style={{ ...cardStyle, marginTop: "25px" }}>
                <h2 style={{ 
                  color: colors.black, 
                  fontWeight: "700",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  fontSize: "20px"
                }}>
                  ✦ Resumen del pedido ✦
                </h2>

                <div style={{
                  background: colors.greenLight,
                  padding: "20px",
                  borderRadius: "15px",
                  marginTop: "15px",
                  border: `2px solid ${colors.green}`,
                }}>
                  <p style={{ 
                    color: colors.black, 
                    fontSize: "1.4rem",
                    fontWeight: "800",
                    textAlign: "center",
                    letterSpacing: "1px"
                  }}>
                    Total: ${total}
                  </p>
                </div>

                <textarea
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  placeholder="Comentarios adicionales..."
                  style={{
                    width: "100%",
                    minHeight: "120px",
                    borderRadius: "15px",
                    border: `2px solid ${colors.green}`,
                    padding: "15px",
                    marginTop: "15px",
                    color: colors.black,
                    fontWeight: "500",
                    fontSize: "16px",
                    background: colors.cream,
                  }}
                />

                <button
                  onClick={sendOrder}
                  style={{
                    width: "100%",
                    marginTop: "20px",
                    padding: "20px",
                    borderRadius: "15px",
                    border: "none",
                    background: `linear-gradient(135deg, ${colors.whatsapp} 0%, #128C7E 100%)`,
                    color: colors.white,
                    fontWeight: "800",
                    fontSize: "18px",
                    cursor: "pointer",
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    transition: "all 0.3s ease",
                    boxShadow: "0 4px 15px rgba(37, 211, 102, 0.3)",
                  }}
                  onMouseEnter={(e) => e.target.style.transform = "scale(1.02)"}
                  onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
                >
                  📱 Enviar pedido por WhatsApp
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
